import { useState } from "react";

function InputPanel({ handleAnalyzeText, handleAnalyzePDF, loading }) {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border">

      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        className="mb-3 w-full border p-2 rounded-lg"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
        placeholder="Or paste resume..."
        className="w-full h-28 border p-3 rounded-lg mb-3"
        onChange={(e) => setResume(e.target.value)}
      />

      <textarea
        placeholder="Paste job description..."
        className="w-full h-28 border p-3 rounded-lg"
        onChange={(e) => setJd(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleAnalyzeText(resume, jd)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Analyze Text
        </button>

        <button
          onClick={() => handleAnalyzePDF(file, jd)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
        >
          Analyze PDF
        </button>
      </div>

      {loading && (
  <div className="mt-3 flex items-center gap-2 text-indigo-600">
    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p>Analyzing with AI...</p>
  </div>
)}
    </div>
  );
}

export default InputPanel;