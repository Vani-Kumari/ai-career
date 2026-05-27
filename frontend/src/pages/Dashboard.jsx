// src/pages/Dashboard.jsx (or src/components/Dashboard.jsx)
import { useState } from "react";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import { analyzeResume, analyzePDF, getSuggestions } from "../services/api";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const handleAnalyzeText = async (resume, jd) => {
    if (!resume || !jd) {
      alert("⚠️ Please provide both resume text AND job description");
      return;
    }
    
    if (resume.length < 50) {
      alert("⚠️ Resume text seems too short. Please paste the complete resume.");
      return;
    }
    
    if (jd.length < 50) {
      alert("⚠️ Job description seems too short. Please paste the complete JD.");
      return;
    }
    
    setLoading(true);
    try {
      const data = await analyzeResume(resume, jd);
      setResult(data);
      setSuggestions(null); // Clear previous suggestions
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to analyze resume. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePDF = async (file, jd) => {
    if (!file || !jd) {
      alert("⚠️ Please provide both PDF file AND job description");
      return;
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      alert("⚠️ Please upload a valid PDF file");
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("⚠️ File size should be less than 10MB");
      return;
    }
    
    setLoading(true);
    try {
      const data = await analyzePDF(file, jd);
      setResult(data);
      setSuggestions(null);
    } catch (error) {
      console.error("PDF Analysis error:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to analyze PDF. Please try pasting the text instead.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async (resume, jd) => {
    if (!resume || !jd) {
      alert("⚠️ Please provide both resume text AND job description");
      return;
    }
    
    setLoading(true);
    try {
      const data = await getSuggestions(resume, jd);
      setSuggestions(data);
      setResult(data); // Also show in result panel
    } catch (error) {
      console.error("Improvement suggestions error:", error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to get suggestions. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Career Copilot 🚀
          </h1>
          <p className="text-gray-600">Upload your resume and job description for AI-powered analysis</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          <InputPanel
            handleAnalyzeText={handleAnalyzeText}
            handleAnalyzePDF={handleAnalyzePDF}
            handleImprove={handleImprove}
            loading={loading}
          />
          <ResultPanel result={result || suggestions} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by AI • Your data is processed securely</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;