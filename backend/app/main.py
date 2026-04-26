from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import resume, analysis


app = FastAPI(title="AI Career Copilot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "success", "message": "AI Career Copilot backend is running 🚀"}

# include routes


app.include_router(resume.router)
app.include_router(analysis.router)


