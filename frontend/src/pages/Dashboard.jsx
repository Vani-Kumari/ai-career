// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import { analyzeResume, analyzePDF, getSuggestions } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [user, setUser] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token) {
      navigate("/login");
    } else {
      if (userData) setUser(JSON.parse(userData));
    }
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
      setSuggestions(null);
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to analyze resume. Please try again.";
      alert(`Error: ${errorMessage}`);
      
      // If unauthorized (token expired), redirect to login
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePDF = async (file, jd) => {
    if (!file || !jd) {
      alert("⚠️ Please provide both PDF file AND job description");
      return;
    }
    
    if (file.type !== 'application/pdf') {
      alert("⚠️ Please upload a valid PDF file");
      return;
    }
    
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
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to analyze PDF. Please try pasting the text instead.";
      alert(`Error: ${errorMessage}`);
      
      if (error.response?.status === 401) {
        handleLogout();
      }
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
      setResult(data);
    } catch (error) {
      console.error("Improvement suggestions error:", error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to get suggestions. Please try again.";
      alert(`Error: ${errorMessage}`);
      
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Career Copilot
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-gray-600">
                  👋 Hello, {user.name || user.email}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Resume Analyzer 🚀
          </h1>
          <p className="text-gray-600">
            Upload your resume and job description for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <InputPanel
            handleAnalyzeText={handleAnalyzeText}
            handleAnalyzePDF={handleAnalyzePDF}
            handleImprove={handleImprove}
            loading={loading}
          />
          <ResultPanel result={result || suggestions} />
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by AI • Your data is processed securely</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;