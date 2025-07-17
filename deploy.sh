#!/bin/bash

# Vercel Deployment Script for Portfolio
echo "🚀 Deploying Portfolio to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami || vercel login

# Deploy to Vercel
echo "📦 Starting deployment..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your portfolio is now live on Vercel!"
