# Base image
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev build-essential curl git \
    && apt-get clean -y

# Set working directory
WORKDIR /workspaces
