#!/bin/bash

# Simple Life Palette Deployment Script with buildx
set -e

REGISTRY="registry.iro.kr/iro/life_palette"
VERSION=$(date +%Y%m%d-%H%M%S)

echo "🚀 Building and pushing to $REGISTRY..."

# Build and push with buildx
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag "$REGISTRY:$VERSION" \
  --tag "$REGISTRY:latest" \
  --push \
  .

echo "✅ Deployed successfully!"
echo "📦 Image: $REGISTRY:$VERSION"
echo "📦 Latest: $REGISTRY:latest"