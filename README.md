# Portfolio - Koushal Vichare

## 🚀 Live Demo
[View Portfolio](https://your-portfolio-url.vercel.app) *(Will be updated after deployment)*

## 📋 Overview
A modern, responsive portfolio website showcasing my work as an entrepreneur, AI/ML enthusiast, and full-stack developer. Built with Flask and deployed on Vercel.

## ✨ Features
- 🎯 Interactive hero section with modern animations
- 🤖 AI chatbot powered by Google Gemini
- 📊 Dynamic project showcase with clean design
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Fast loading and optimized performance

## 🛠️ Tech Stack
- **Backend**: Python, Flask, Google Gemini AI
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with modern design patterns
- **Deployment**: Vercel
- **AI**: Google Gemini API

## 🚀 Quick Deployment to Vercel

### Option 1: GitHub + Vercel (Recommended)
1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Set environment variables (see Configuration section)
5. Deploy automatically!

### Option 2: Vercel CLI
```bash
# Install Node.js first, then:
npm install -g vercel
vercel login
vercel --prod
```

## 🔧 Configuration

### Environment Variables (Required)
Set these in Vercel Dashboard under Project Settings > Environment Variables:
- `GOOGLE_GEMINI_API_KEY` - Your Google Gemini API key
- `SECRET_KEY` - A secure random string for Flask sessions
- `FLASK_ENV` - Set to `production`

## 📖 Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
copy .env.example .env
# Edit .env with your API keys

# Run the application
python app.py
```

Visit `http://localhost:5000` to view the portfolio locally.

## 📁 Project Structure
```
portfolio/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── vercel.json           # Vercel configuration
├── static/               # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── assets/           # Images and other assets
├── templates/            # HTML templates
│   ├── modern-index.html # Main portfolio page
│   └── blog.html         # Blog page
└── README.md             # This file
```

## 📋 Deployment Checklist

- [ ] Node.js installed (for Vercel CLI)
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)

## 🎨 Features Implemented
- [x] Responsive navigation with mobile menu
- [x] Hero section with animated text
- [x] About section with skills showcase
- [x] Projects gallery with hover effects
- [x] Experience timeline
- [x] Education section
- [x] Achievements showcase
- [x] Blog with article cards
- [x] Contact form with validation
- [x] Dark/Light theme toggle
- [x] Smooth scrolling and animations
- [x] SEO optimization
- [x] Performance optimization

## 📞 Contact
- **Email**: koushalvichare7@gmail.com
- **LinkedIn**: [linkedin.com/in/koushalvichare](https://linkedin.com/in/koushalvichare)
- **GitHub**: [github.com/koushalvichare7](https://github.com/koushalvichare7)
- **Phone**: +91 8767217069

---

⭐ **Star this repository if it helped you build your own portfolio!**

For detailed deployment instructions, see `VERCEL_DEPLOYMENT.md` and `SETUP_GUIDE.md`.
