# Use Node.js 20 Alpine as base image for a small footprint
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# Create a basic package.json first
RUN echo '{"name":"placeholder-image-server","version":"1.0.0","main":"placeholder-server.js","scripts":{"start":"node placeholder-server.js"},"dependencies":{}}' > package.json

# Copy application code
COPY placeholder-server.js .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Run the application
CMD ["node", "placeholder-server.js"]
