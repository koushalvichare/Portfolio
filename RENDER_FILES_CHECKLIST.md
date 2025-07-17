# 📋 Render Deployment File Checklist

## ✅ Essential Files for Render

Run this checklist to ensure all files are ready:

### Core Application Files
- [ ] `app.py` - Main Flask application
- [ ] `requirements.txt` - Python dependencies ⚠️ **CRITICAL**
- [ ] `templates/` folder - HTML templates
- [ ] `static/` folder - CSS, JS, images

### Render Configuration Files  
- [ ] `build.sh` - Build script (optional)
- [ ] `start.sh` - Start script (optional)
- [ ] `render.yaml` - Render configuration (optional)

### Content Files
- [ ] `README.md` - Project documentation
- [ ] All deployment guides (`.md` files)

---

## 🔍 File Content Verification

### 1. Check `requirements.txt` exists and contains:
```
Flask==2.3.3
python-dotenv==1.0.0
requests==2.31.0
google-generativeai==0.3.2
PyPDF2==3.0.1
gunicorn==21.2.0
Werkzeug==2.3.7
```

### 2. Check `app.py` has port configuration:
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
```

### 3. Verify environment variables ready:
- `GOOGLE_GEMINI_API_KEY=AIzaSyBHVl_SgpzJJG39WJrlkNBtCW5EVtxmLx8`
- `SECRET_KEY=your-secure-random-string`
- `FLASK_ENV=production`

---

## 🚀 Upload to GitHub Checklist

### Files to Upload:
```
✅ UPLOAD THESE:
├── app.py
├── requirements.txt ⚠️ CRITICAL
├── build.sh
├── start.sh
├── render.yaml
├── static/
│   ├── css/
│   ├── js/
│   └── assets/
├── templates/
│   ├── modern-index.html
│   └── blog.html
└── All .md guide files

❌ DON'T UPLOAD:
├── .env (contains secrets!)
├── __pycache__/
├── .vscode/
├── .git/ (if manually uploading)
```

---

## 🔧 Common Issues & Fixes

### Issue: "requirements.txt not found"
**Fix:** Upload `requirements.txt` to GitHub root directory

### Issue: "Build command failed"  
**Fix:** Use direct pip command in Render settings:
```
pip install Flask==2.3.3 python-dotenv==1.0.0 requests==2.31.0 gunicorn==21.2.0
```

### Issue: "App won't start"
**Fix:** Check environment variables are set in Render dashboard

### Issue: "502 Bad Gateway"
**Fix:** Verify start command in Render:
```
gunicorn --bind 0.0.0.0:$PORT app:app
```

---

## ✅ Success Indicators

After fixing and redeploying:
- ✅ Build logs show: "Successfully installed Flask..."
- ✅ Deploy logs show: "Build succeeded 🎉"
- ✅ App status shows: "Live"
- ✅ URL loads: `https://your-app.onrender.com`

---

**Most common fix: Just make sure `requirements.txt` is uploaded to GitHub!** 🎯
