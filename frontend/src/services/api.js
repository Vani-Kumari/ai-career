import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// ✅ TEXT API
export const analyzeResume = async (resume, jd) => {
  const res = await axios.post(`${API_BASE}/analyze`, {
    resume_text: resume,
    job_description: jd,
  });

  return res.data.ai_response;
};

// ✅ PDF API (IMPORTANT FIX)
export const analyzePDF = async (file, jd) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jd);

  const res = await axios.post(
    `${API_BASE}/analyze-pdf`,
    formData
  );

  return res.data.ai_response;
};