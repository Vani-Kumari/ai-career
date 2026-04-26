from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import analyze_with_llm

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str


@router.post("/analyze")
def analyze(data: AnalyzeRequest):

    result = analyze_with_llm(
        data.resume_text,
        data.job_description
    )

    return {
        "ai_response": result
    }