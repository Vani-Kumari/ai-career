from fastapi import APIRouter, UploadFile, File, Form
from app.services.pdf_service import extract_text_from_pdf
from app.services.llm_service import (
    analyze_with_llm,
    generate_suggestions_and_email
)


router = APIRouter()

# ✅ TEXT API (already exists)
@router.post("/analyze")
def analyze(data: dict):
    return {
        "ai_response": analyze_with_llm(
            data["resume_text"],
            data["job_description"]
        )
    }

# ✅ PDF API (THIS MUST MATCH EXACTLY)
@router.post("/analyze-pdf")
async def analyze_pdf(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(file.file)

    result = analyze_with_llm(resume_text, job_description)

    return {"ai_response": result}

@router.post("/improve")
def improve(data: dict):
    result = generate_suggestions_and_email(
        data["resume_text"],
        data["job_description"]
    )
    return {"ai_response": result}