# Life Palette - Production Dockerfile
# Multi-stage build for optimized production image

# Stage 1: Build stage (optional for future asset optimization)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy source files
COPY ./ ./

# Stage 2: Production stage with Nginx
FROM nginx:1.25-alpine

# Install required packages for security updates
RUN apk update && apk upgrade && \
    apk add --no-cache \
    ca-certificates \
    curl \
    && rm -rf /var/cache/apk/*

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy website files from builder stage
COPY --from=builder /app/ /usr/share/nginx/html/

# Copy custom error pages
COPY 404.html /usr/share/nginx/html/404.html
COPY 50x.html /usr/share/nginx/html/50x.html

# Create robots.txt
RUN echo 'User-agent: *\nAllow: /\n\nSitemap: https://lifepalette.iro.kr/sitemap.xml' > /usr/share/nginx/html/robots.txt

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Expose port
EXPOSE 80

# Add labels for better container management
LABEL maintainer="Life Palette Team" \
      version="1.0.0" \
      description="Life Palette - AI based senior emotional regulation and customized art therapy service" \
      org.opencontainers.image.source="https://github.com/life-palette/website" \
      org.opencontainers.image.vendor="Life Palette" \
      org.opencontainers.image.title="Life Palette Website"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]