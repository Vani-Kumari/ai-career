// src/services/api.js
import axios from "axios";

const API = "http://127.0.0.1:8000";

// Add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const analyzeResume = async (resume_text, job_description) => {
  const res = await axios.post(`${API}/analyze`, {
    resume_text,
    job_description,
  });
  return res.data.ai_response;
};

export const analyzePDF = async (pdfFile, job_description) => {
  const formData = new FormData();
  formData.append('file', pdfFile);
  formData.append('job_description', job_description);
  
  const res = await axios.post(`${API}/analyze-pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.ai_response || res.data;
};

export const getSuggestions = async (resume_text, job_description) => {
  const res = await axios.post(`${API}/suggest`, {
    resume_text,
    job_description,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
};