#!/bin/bash

# Configuration
KEY_PATH="/home/alex/Documents/classwork/BiteBytes.pem"
REMOTE_USER="ubuntu"
REMOTE_HOST="ec2-98-92-152-246.compute-1.amazonaws.com"
REMOTE_DIR="~/FavBytes"

echo "--- Deploying to Production ---"

# 1. Push to Git
echo "Pushing code to GitHub..."
git push origin production

# 2. Update Server
echo "Updating code on server and rebuilding..."
ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" "source ~/.profile && cd $REMOTE_DIR && \
    git pull origin production && \
    npm install && \
    npm run build && \
    ~/.nvm/versions/node/v20.20.1/bin/pm2 restart ecosystem.config.js"

echo "--- Deployment Complete ---"
