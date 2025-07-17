# ✅ GitHub Deployment Checklist

## Before You Start
- [ ] All your portfolio files are saved
- [ ] You have a Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))
- [ ] You have a GitHub account (sign up at [github.com](https://github.com))

## Files to Upload to GitHub
```
✅ INCLUDE these files:
├── app.py
├── requirements.txt
├── vercel.json
├── README.md
├── GITHUB_DEPLOYMENT.md
├── static/
│   ├── css/
│   ├── js/
│   └── assets/
├── templates/
│   ├── modern-index.html
│   └── blog.html
└── All other .md files

❌ DO NOT include:
├── .env (contains secrets!)
├── __pycache__/ (if exists)
├── .vscode/ (if exists)
├── *.pyc files
```

## Deployment Steps
1. **Create GitHub Repository**
   - [ ] Go to github.com → New repository
   - [ ] Name: `portfolio` (or your choice)
   - [ ] Set to Public
   - [ ] Create repository

2. **Upload Files**
   - [ ] Upload all files except those in "DO NOT include" list
   - [ ] Commit with message: "Initial portfolio deployment"

3. **Deploy to Vercel**
   - [ ] Go to vercel.com
   - [ ] Sign up with GitHub
   - [ ] Import your portfolio repository
   - [ ] Let Vercel auto-detect Python/Flask

4. **Configure Environment Variables**
   - [ ] Add `GOOGLE_GEMINI_API_KEY`
   - [ ] Add `SECRET_KEY` (random string)
   - [ ] Add `FLASK_ENV` = `production`

5. **Test Your Live Site**
   - [ ] Visit your vercel.app URL
   - [ ] Test all pages (Home, Blog, Contact)
   - [ ] Test theme toggle
   - [ ] Test contact form

## Your Live URL
After deployment: `https://portfolio-yourusername.vercel.app`

## Need Help?
- Full guide: Read `GITHUB_DEPLOYMENT.md`
- Stuck? Check Vercel's deployment logs
- Questions? GitHub and Vercel have great documentation

---

🚀 **Ready to go live? Follow the steps in GITHUB_DEPLOYMENT.md!**
