import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: resume,
        job_description: jd,
      });
      setResult(res.data.ai_response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EAE0] p-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-[#1F2937]">
          🚀 AI Career Copilot
        </h1>
        <p className="text-gray-600">
          Optimize your resume for any job using AI
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* LEFT PANEL */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-3 text-[#1F2937]">Resume</h2>

          <textarea
            placeholder="Paste your resume..."
            className="w-full h-40 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            onChange={(e) => setResume(e.target.value)}
          />

          <h2 className="font-semibold mt-4 mb-3 text-[#1F2937]">
            Job Description
          </h2>

          <textarea
            placeholder="Paste job description..."
            className="w-full h-40 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            onChange={(e) => setJd(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            className="w-full mt-4 bg-[#6366F1] text-white py-2 rounded-lg hover:bg-[#4F46E5] transition"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-3 text-[#1F2937]">
            Analysis Result
          </h2>

          {!result && (
            <p className="text-gray-400">No analysis yet...</p>
          )}

          {result && (
            <div className="space-y-4">

              {/* Score */}
              <div>
                <p className="text-sm text-gray-500">Match Score</p>
                <p className="text-3xl font-bold text-[#6366F1]">
                  {Math.round(result.match_score * 100)}%
                </p>
              </div>

              {/* Matched Skills */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {result.matched_skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Missing Skills</p>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Summary</p>
                <p className="text-gray-700">{result.summary}</p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;