import axios from "axios";

export const analyzeResume = async (resume, jd) => {
  const res = await axios.post("http://127.0.0.1:8000/analyze", {
    resume_text: resume,
    job_description: jd,
  });
  return res.data.ai_response;
};