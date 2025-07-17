#!/usr/bin/env bash
# Render build script

echo "🔍 Checking current directory and files..."
pwd
ls -la

echo "📋 Looking for requirements.txt..."
if [ -f "requirements.txt" ]; then
    echo "✅ Found requirements.txt"
    cat requirements.txt
else
    echo "❌ requirements.txt not found"
    echo "📁 Available files:"
    find . -name "*.txt" -o -name "*.py" | head -10
fi

echo "📦 Installing Python dependencies..."
# Try pip install with explicit path
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    # Fallback: install essential packages manually
    echo "⚠️ Installing packages manually as fallback..."
    pip install Flask==2.3.3 python-dotenv==1.0.0 requests==2.31.0 gunicorn==21.2.0 Werkzeug==2.3.7
fi

echo "✅ Build completed successfully!"
