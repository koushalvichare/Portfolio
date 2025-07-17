from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import json
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Gemini AI configuration
GEMINI_API_KEY = os.getenv('GOOGLE_GEMINI_API_KEY')
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

# Resume data extracted from PDF
RESUME_DATA = {
    "name": "Koushal Vijay Vichare",
    "location": "Mumbai, Maharashtra",
    "phone": "+91 8767217069",
    "email": "koushalvichare7@gmail.com",
    "linkedin": "linkedin.com/in/koushalvichare",
    "github": "github.com/koushalvichare7",
    "experience": [
        {
            "title": "CEO & Co-Founder",
            "company": "Pi Pascal's Institute",
            "duration": "Jun 2024 - Present",
            "achievements": [
                "Developed B2B operations driving 30% monthly growth",
                "Led ed-tech platform development with in-depth R&D",
                "Client outreach across western India",
                "Market research and competitor analysis"
            ]
        },
        {
            "title": "CEO & Founder",
            "company": "Matchbox Labs",
            "duration": "Mar 2022 - Present",
            "achievements": [
                "Generated over INR 2 crore revenue",
                "Achieved 600% ROI for clients",
                "Led 30+ team members and 300+ freelancers",
                "Managed data operations for Indian and overseas campaigns"
            ]
        },
        {
            "title": "Coding Expert Tier 3",
            "company": "Outlier AI",
            "duration": "Jun 2024 - Present",
            "achievements": [
                "Fine-tuned LLM models for coding tasks",
                "Achieved 100% accuracy on all tasks",
                "Pay increased from $16/hour to $52/hour",
                "Worked across multiple programming languages"
            ]
        }
    ],
    "projects": [
        {
            "name": "Finance and Investment Expert LLM Chatbot",
            "tech": "Python, Hugging Face, GPT-2",
            "date": "Feb 2025",
            "description": "AI chatbot for financial planning and investment guidance with Gradio interface"
        },
        {
            "name": "Matchboxcoin NFT",
            "tech": "Solidity, Web3, Metamask",
            "date": "Oct 2024",
            "description": "NFT asset deployed on Ethereum with smart contracts"
        },
        {
            "name": "ROI Analysis Marketing Campaign",
            "tech": "Tableau, R, Python, Google Sheets",
            "date": "Sep 2024",
            "description": "Conversion and ROI visualization across demographics"
        },
        {
            "name": "Save the Planet AR Game",
            "tech": "Blender, OpenGL, ARCore, Unity",
            "date": "Jan 2024",
            "description": "AR game with Earth and asteroids in real-world environment"
        }
    ],
    "skills": {
        "languages": ["Solidity", "R", "Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS", "Swift"],
        "frameworks": ["React", "Node.js", "Flask", "TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
        "tools": ["Docker", "Kubernetes", "Google Cloud Platform", "Git", "VS Code", "PyCharm"]
    },
    "education": [
        {
            "degree": "Computer Science and Engineering",
            "institution": "Lovely Professional University",
            "duration": "2023 – 2026",
            "grade": "CGPA: 7.6"
        },
        {
            "degree": "Diploma in CSE",
            "institution": "MSBTE",
            "duration": "2020 – 2023",
            "grade": "79.60%"
        }
    ],
    "achievements": [
        "Star Performer in Student Revenue Generation Program - Over 30 lakhs revenue (2025)",
        "Nominated for Youngest Tycoon by TIE, Bangalore (2024)",
        "Star Startup Alumni in BSIET (2023)"
    ]
}

def analyze_resume_with_gemini(prompt):
    """Use Gemini AI to analyze resume and provide insights"""
    try:
        # Create a comprehensive prompt with resume data
        full_prompt = f"""
        Act as a professional career coach. Based on the resume below, {prompt}
        
        RESUME DATA:
        Name: {RESUME_DATA['name']}
        Location: {RESUME_DATA['location']}
        Contact: {RESUME_DATA['email']} | {RESUME_DATA['phone']}
        
        EXPERIENCE:
        """
        
        for exp in RESUME_DATA['experience']:
            full_prompt += f"- {exp['title']} at {exp['company']} ({exp['duration']})\n"
            for achievement in exp['achievements']:
                full_prompt += f"  • {achievement}\n"
        
        full_prompt += f"\nPROJECTS:\n"
        for project in RESUME_DATA['projects']:
            full_prompt += f"- {project['name']} ({project['tech']}) - {project['description']}\n"
        
        full_prompt += f"\nSKILLS:\n"
        full_prompt += f"Languages: {', '.join(RESUME_DATA['skills']['languages'])}\n"
        full_prompt += f"Frameworks: {', '.join(RESUME_DATA['skills']['frameworks'])}\n"
        full_prompt += f"Tools: {', '.join(RESUME_DATA['skills']['tools'])}\n"
        
        full_prompt += f"\nEDUCATION:\n"
        for edu in RESUME_DATA['education']:
            full_prompt += f"- {edu['degree']} at {edu['institution']} ({edu['duration']}) - {edu['grade']}\n"
        
        # Make API request to Gemini
        headers = {
            'Content-Type': 'application/json',
        }
        
        data = {
            "contents": [{
                "parts": [{
                    "text": full_prompt
                }]
            }]
        }
        
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers=headers,
            json=data
        )
        
        if response.status_code == 200:
            result = response.json()
            return result['candidates'][0]['content']['parts'][0]['text']
        else:
            return "AI analysis temporarily unavailable. Please try again later."
            
    except Exception as e:
        return f"AI analysis temporarily unavailable. Error: {str(e)}"

@app.route('/')
def index():
    """Main portfolio page"""
    # Generate AI insights for the portfolio
    ai_summary = analyze_resume_with_gemini(
        "summarize my core strengths in 2-3 sentences, suggest top 3 FAANG roles I'm best suited for, and create a compelling headline for my portfolio site."
    )
    
    return render_template('modern-index.html', 
                         resume=RESUME_DATA, 
                         ai_summary=ai_summary)

@app.route('/blog')
def blog():
    """Blog page with articles and insights"""
    return render_template('blog.html')

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    """AI chatbot endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Generate AI response based on resume
        ai_response = analyze_resume_with_gemini(
            f"Answer this question about my background and experience: {user_message}. Keep the response conversational and professional."
        )
        
        return jsonify({
            'response': ai_response,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': 'Failed to generate response',
            'details': str(e)
        }), 500

@app.route('/api/resume-analysis')
def resume_analysis():
    """Get detailed resume analysis"""
    analysis = analyze_resume_with_gemini(
        """Provide a detailed analysis including:
        1. Top 5 technical strengths
        2. Best FAANG role matches with reasoning
        3. Key achievements that stand out
        4. Recommended skill improvements
        5. Interview talking points
        Format as JSON with clear sections."""
    )
    
    return jsonify({
        'analysis': analysis,
        'resume_data': RESUME_DATA
    })

@app.route('/api/project-recommendations')
def project_recommendations():
    """Get AI-powered project recommendations"""
    recommendations = analyze_resume_with_gemini(
        """Based on my experience and skills, suggest 3 impressive project ideas that would:
        1. Showcase my technical abilities for FAANG interviews
        2. Demonstrate leadership and scale
        3. Highlight my AI/ML and entrepreneurial background
        Include specific technologies and implementation approaches."""
    )
    
    return jsonify({
        'recommendations': recommendations
    })

# Add error handlers
@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors by redirecting to main page"""
    return render_template('modern-index.html', resume=RESUME_DATA), 200

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors gracefully"""
    return render_template('modern-index.html', resume=RESUME_DATA), 200

# Health check endpoint for Vercel
@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Portfolio is running'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
