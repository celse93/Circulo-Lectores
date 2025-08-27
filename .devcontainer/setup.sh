#!/usr/bin/env bash
set -e

#!/bin/bash

# Path to devcontainer Python
export PIPENV_PYTHON=/usr/local/python/current/bin/python
export PIPENV_VENV_IN_PROJECT=1  # optional: create .venv inside project

# Upgrade pip and pipenv
$PIPENV_PYTHON -m pip install --upgrade pip pipenv

# Ensure NVM is loaded
export NVM_DIR=/usr/local/nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Root dependencies (optional)
npm install || true
pipenv install

# Web dependencies
if [ -d "web" ]; then
  cd web
  npm install
  cd ..
fi

# API dependencies
if [ -d "api" ]; then
  cd api
  pipenv install --dev --ignore-pipfile
  cd ..
fi

echo "✅ All dependencies installed for root, web, and api."
