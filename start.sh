#!/usr/bin/env bash
# Render start script

# Start the Flask application with Gunicorn
gunicorn --bind 0.0.0.0:$PORT app:app
