# Vercel Deployment Script for Portfolio (PowerShell)
Write-Host "🚀 Deploying Portfolio to Vercel..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "📥 Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI version: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login to Vercel (if not already logged in)
Write-Host "🔐 Checking Vercel authentication..." -ForegroundColor Blue
$authStatus = vercel whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔑 Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Deploy to Vercel
Write-Host "📦 Starting deployment..." -ForegroundColor Blue
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host "🌐 Your portfolio is now live on Vercel!" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
}
