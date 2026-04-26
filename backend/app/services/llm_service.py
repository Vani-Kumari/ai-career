import os
import json
from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL_NAME = "llama-3.3-70b-versatile"

def analyze_with_llm(resume_text: str, job_description: str):

    prompt = f"""
You are an ATS resume analyzer.

Return ONLY valid JSON.

Rules:
- Do NOT include match_score
- No markdown, no explanation

Format:
{{
  "resume_skills": [],
  "job_skills": [],
  "summary": ""
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content

    # ✅ Clean markdown
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(content)
    except:
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "summary": "Error parsing AI response"
        }

    # ✅ Normalize skills
    resume_skills = set(map(str.lower, data.get("resume_skills", [])))
    job_skills = set(map(str.lower, data.get("job_skills", [])))

    matched = list(resume_skills & job_skills)
    missing = list(job_skills - resume_skills)

    # ✅ Deterministic score
    if len(job_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(job_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "summary": data.get("summary", "")
    }