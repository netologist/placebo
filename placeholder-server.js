const http = require('http');
const url = require('url');

// Configuration
const PORT = process.env.PORT || 3000;

/**
 * Generate a placeholder image with specified dimensions and background
 * @param {number} width - Image width in pixels
 * @param {number} height - Image height in pixels
 * @param {string} background - Background color in hex format (no # prefix)
 * @param {string} textColor - Text color in hex format (no # prefix)
 */
function generatePlaceholderSVG(width, height, background = '888888', textColor = 'ffffff') {
  // Validate dimensions to prevent security issues
  width = Math.min(Math.max(parseInt(width) || 300, 1), 3000);
  height = Math.min(Math.max(parseInt(height) || 150, 1), 3000);
  
  // Sanitize color inputs to prevent injection
  const bgColor = background.replace(/[^a-fA-F0-9]/g, '').substring(0, 6) || '888888';
  const txtColor = textColor.replace(/[^a-fA-F0-9]/g, '').substring(0, 6) || 'ffffff';
  
  // Calculate font size based on image dimensions
  const fontSize = Math.max(Math.min(width, height) / 10, 12);
  
  // Generate SVG content
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#${bgColor}" />
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="#${txtColor}" 
          dominant-baseline="middle" text-anchor="middle">${width} × ${height}</text>
  </svg>`;
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle only GET requests
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }
  
  // Route handling
  if (pathname === '/') {
    // Homepage with usage instructions
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Placeholder Image Generator</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
            .examples img { margin: 10px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>Placeholder Image Generator</h1>
          <p>Generate placeholder images with custom dimensions and colors.</p>
          
          <h2>Usage</h2>
          <p><code>/placeholder/{width}/{height}?bg={background}&text={textColor}</code></p>
          
          <ul>
            <li><strong>width</strong>: Image width in pixels (default: 300, max: 3000)</li>
            <li><strong>height</strong>: Image height in pixels (default: 150, max: 3000)</li>
            <li><strong>bg</strong>: Background color in hex format without # (default: 888888)</li>
            <li><strong>text</strong>: Text color in hex format without # (default: ffffff)</li>
          </ul>
          
          <h2>Examples</h2>
          <div class="examples">
            <img src="/placeholder/300/150" alt="Default 300x150">
            <img src="/placeholder/200/100?bg=ff5500" alt="200x100 with orange background">
            <img src="/placeholder/250/100?bg=3498db&text=000000" alt="250x100 with blue background and black text">
          </div>
        </body>
      </html>
    `);
  } else if (pathname.startsWith('/placeholder/')) {
    // Extract dimensions from path
    const parts = pathname.split('/').filter(part => part);
    
    // Check if the path has the correct format
    if (parts.length >= 3) {
      const width = parts[1];
      const height = parts[2];
      const { bg, text } = parsedUrl.query;
      
      // Generate SVG
      const svg = generatePlaceholderSVG(width, height, bg, text);
      
      // Set appropriate headers
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.end(svg);
    } else {
      res.statusCode = 400;
      res.end('Bad Request: Please provide width and height');
    }
  } else {
    // Handle 404
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Placeholder image server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
