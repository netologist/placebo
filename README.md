# Placebo - placeholder image generator

A lightweight, fast placeholder image generator server built with Node.js. Generate customizable SVG placeholders on the fly for your web projects.

If you need to client-side solution, I strongly recommend [holder.js](https://holderjs.com/).

## Features

- **Fast & Lightweight**: Generates SVG placeholders with minimal overhead
- **Customizable**: Control dimensions, background colors, and text colors
- **Simple API**: Easy-to-use URL-based API for image generation
- **Dockerized**: Ready to deploy anywhere with Docker support
- **No Dependencies**: Pure Node.js implementation with no external libraries

## Quick Start

### Option 1: Run with Node.js

```bash
# Clone the repository
git clone https://github.com/netologist/placebo.git
cd placebo

# Run the server
node placeholder-server.js
```

### Option 2: Build & Run with Docker

```bash
# Build the Docker image
docker build -t placebo .

# Run the container
docker run -p 3000:3000 placebo
```

### Option 3: Run with Docker

```bash
# Run the container from registry
docker run run -p 3000:3000 ghcr.io/netologist/placebo:latest
```

The server will be available at http://localhost:3000

## Usage

### API Endpoints

#### Generate a placeholder image

```
GET /placeholder/{width}/{height}?bg={background}&text={textColor}
```

Parameters:

- `width`: Width in pixels (default: 300, max: 3000)
- `height`: Height in pixels (default: 150, max: 3000)
- `bg`: Background color in hex format without # (default: 888888)
- `text`: Text color in hex format without # (default: ffffff)

### Examples

```
# Default gray placeholder (300x150)
http://localhost:3000/placeholder/300/150

# Custom size (500x200)
http://localhost:3000/placeholder/500/200

# Custom colors (orange background with black text)
http://localhost:3000/placeholder/400/300?bg=ff9900&text=000000

# Blue placeholder for a banner
http://localhost:3000/placeholder/1200/300?bg=0078D7
```

## Implementation Details

Placebo generates SVG images on demand using Node.js's built-in HTTP server. The implementation:

- Sanitizes all input parameters to prevent injection attacks
- Implements sensible defaults and boundaries for dimensions
- Uses SVG format for crisp rendering at any resolution
- Includes cache headers for optimal performance

## Deployment

### Environment Variables

- `PORT`: Server port (default: 3000)

### Production Considerations

For production deployment, consider:

- Using a reverse proxy like Nginx for SSL termination and caching
- Setting up container orchestration (Kubernetes, Docker Swarm)
- Implementing rate limiting for public-facing instances

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
