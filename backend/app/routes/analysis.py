from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import analyze_resume_job

router = APIRouter()

class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

@router.post("/analyze")
def analyze(data: AnalysisRequest):
    result = analyze_resume_job(
        data.resume_text,
        data.job_description
    )
    return result