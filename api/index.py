import sys
import os

# Add the parent directory to the Python path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

# This is the WSGI entry point for Vercel
# Vercel expects the Flask app to be available as a callable
if __name__ == "__main__":
    app.run()
else:
    # For Vercel deployment
    application = app
