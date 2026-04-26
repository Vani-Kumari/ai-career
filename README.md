# 🚀 AI Career Copilot

An AI-powered SaaS application that analyzes resumes against job descriptions and provides ATS scoring, skill gap analysis, and resume improvement suggestions.

---

## 🧠 Features

- Upload resume (PDF)
- Extract resume text
- Compare with job description
- AI-powered match score (0–100)
- Matched & missing skills extraction
- Resume improvement suggestions
- AI-generated summary
- JSON API for frontend integration

---

## ⚙️ Tech Stack

### Backend
- FastAPI
- Python
- Groq LLM (LLaMA models)
- PyMuPDF (PDF parsing)
- Uvicorn

### Frontend (planned)
- React (Vite)
- Tailwind CSS
- Recharts (charts & analytics)

---

## 🚀 API Endpoint

### POST `/analyze`

### Request
```json
{
  "resume_text": "Python FastAPI SQL developer...",
  "job_description": "We are looking for backend developer..."
}
