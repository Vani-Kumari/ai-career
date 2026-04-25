from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Read file bytes
        contents = await file.read()

        # Open PDF
        doc = fitz.open(stream=contents, filetype="pdf")

        text = ""
        for page in doc:
            text += page.get_text()

        return {
            "filename": file.filename,
            "extracted_text": text
        }

    except Exception as e:
        return {
            "error": str(e)
        }