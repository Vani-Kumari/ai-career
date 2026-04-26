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
- match_score must be an INTEGER from 0 to 100
- Do NOT use decimals
- No markdown, no explanation

Format:
{{
  "match_score": integer,
  "matched_skills": [],
  "missing_skills": [],
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

    # Clean possible markdown
    content = content.replace("```json", "").replace("```", "").strip()

    # Convert string → dict
    return json.loads(content)