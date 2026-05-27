import axios from "axios";

const API = "http://127.0.0.1:8000";

// Existing
export const analyzeResume = async (
  resume_text,
  job_description
) => {
  const res = await axios.post(
    `${API}/analyze`,
    {
      resume_text,
      job_description,
    }
  );

  return res.data.ai_response;
};

export const analyzePDF = async (pdfFile, job_description) => {
  const formData = new FormData();
  
  // Try these different field name variations based on your backend
  formData.append('file', pdfFile);           // Common
  // OR formData.append('pdf', pdfFile);      // Alternative
  // OR formData.append('resume', pdfFile);   // Alternative
  // OR formData.append('pdf_file', pdfFile); // Alternative
  
  formData.append('job_description', job_description);
  // OR formData.append('jd', job_description);
  // OR formData.append('description', job_description);
  
  const res = await axios.post(`${API}/analyze-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return res.data.ai_response || res.data;
};

// NEW
export const getSuggestions = async (
  resume_text,
  job_description
) => {
  const res = await axios.post(
    `${API}/suggest`,
    {
      resume_text,
      job_description,
    }
  );

  return res.data;
};