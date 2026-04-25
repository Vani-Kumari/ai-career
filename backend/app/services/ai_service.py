import re

STOPWORDS = {
    "i","we","you","they","with","and","or","to","for","a","an",
    "the","is","are","was","were","be","been","being","in","on",
    "at","of","job","need","looking","experience","developer"
}

def clean_text(text):
    words = re.findall(r"[a-zA-Z]+", text.lower())
    return [w for w in words if w not in STOPWORDS and len(w) > 2]


def analyze_resume_job(resume_text: str, job_description: str):

    resume_words = set(clean_text(resume_text))
    job_words = set(clean_text(job_description))

    if len(job_words) == 0:
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": []
        }

    matched_skills = list(resume_words & job_words)
    missing_skills = list(job_words - resume_words)

    # 🔥 improved scoring logic
    match_ratio = len(matched_skills) / len(job_words)

    # penalty for small job descriptions (important!)
    penalty = min(len(job_words) / 10, 1)

    score = int(match_ratio * penalty * 100)

    return {
        "match_score": min(score, 100),
        "matched_skills": matched_skills[:20],
        "missing_skills": missing_skills[:20]
    }