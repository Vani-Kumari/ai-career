import { useState } from "react";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import { analyzeResume, analyzePDF } from "../services/api";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeText = async (resume, jd) => {
    setLoading(true);
    try {
      const data = await analyzeResume(resume, jd);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePDF = async (file, jd) => {
    setLoading(true);
    try {
      const data = await analyzePDF(file, jd);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        AI Career Copilot 🚀
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <InputPanel
          handleAnalyzeText={handleAnalyzeText}
          handleAnalyzePDF={handleAnalyzePDF}
          loading={loading}
        />
        <ResultPanel result={result} />
      </div>
    </div>
  );
}

export default Dashboard;