import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const analyzeResume = async (resume, jd) => {
  try {
    const res = await axios.post(`${API_BASE}/analyze`, {
      resume_text: resume,
      job_description: jd,
    });
    return res.data.ai_response;
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
};