// src/components/InputPanel.jsx
import { useState } from "react";

function InputPanel({ handleAnalyzeText, handleAnalyzePDF, handleImprove, loading }) {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("text"); // 'text' or 'pdf'

  // Sample data for testing
  const loadSampleData = () => {
    const sampleResume = `Vani Kumari
Frontend React Developer
Email: vani.k@email.com | Phone: +91 98765 01234

Professional Summary:
Passionate Frontend Developer with 3.5 years of experience specializing in React.js. Proven track record of building responsive, high-performance web applications.

Technical Skills:
- Frontend: React.js, Next.js, Redux, Context API, Zustand
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Styling: Tailwind CSS, Material-UI, SCSS, Responsive Design
- Tools: Webpack, Vite, Git, npm/yarn
- Testing: Jest, React Testing Library
- APIs: RESTful APIs, GraphQL

Experience:
Senior Frontend Developer | TechCorp Solutions | 2022-Present
- Led migration to React.js, improving performance by 60%
- Implemented Redux Toolkit for state management
- Built responsive components using Tailwind CSS
- Achieved 92% code coverage with Jest tests`;

    const sampleJD = `Frontend React Developer
Requirements:
- 3+ years React.js experience
- Strong JavaScript/TypeScript skills
- Experience with Redux or Context API
- HTML5, CSS3, Tailwind CSS
- RESTful APIs integration
- Git version control
- Testing experience with Jest
- Next.js knowledge is a plus`;

    setResume(sampleResume);
    setJd(sampleJD);
    setFile(null);
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span>📄</span> Resume Analyzer
      </h2>
      
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "text" 
              ? "bg-white text-indigo-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📝 Paste Text
        </button>
        <button
          onClick={() => setActiveTab("pdf")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "pdf" 
              ? "bg-white text-indigo-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📎 Upload PDF
        </button>
      </div>

      {/* PDF Upload Section */}
      {activeTab === "pdf" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose PDF File
          </label>
          <input
            type="file"
            accept=".pdf"
            className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setResume(""); // Clear text when file is uploaded
            }}
          />
          {file && (
            <p className="text-xs text-green-600 mt-1">
              ✓ Selected: {file.name}
            </p>
          )}
        </div>
      )}

      {/* Text Resume Section */}
      {activeTab === "text" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Text
          </label>
          <textarea
            placeholder="Paste your resume text here..."
            className="w-full h-40 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={resume}
            onChange={(e) => {
              setResume(e.target.value);
              setFile(null); // Clear file when text is pasted
            }}
          />
        </div>
      )}

      {/* Job Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          placeholder="Paste the job description here..."
          className="w-full h-32 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleAnalyzeText(resume, jd)}
          disabled={loading || (!resume && activeTab === "text")}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition font-medium"
        >
          Analyze Text
        </button>

        <button
          onClick={() => handleAnalyzePDF(file, jd)}
          disabled={loading || (!file && activeTab === "pdf")}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition font-medium"
        >
          Analyze PDF
        </button>

        <button
          onClick={() => handleImprove(resume, jd)}
          disabled={loading || (!resume && !file)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition font-medium"
        >
          Improve Resume
        </button>
      </div>

      {/* Sample Data Button */}
      <button
        onClick={loadSampleData}
        className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition text-sm font-medium"
      >
        🧪 Load Sample Data for Testing
      </button>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-600 font-medium">AI is analyzing your resume...</p>
          </div>
          <p className="text-xs text-indigo-500 text-center mt-1">
            This may take a few seconds
          </p>
        </div>
      )}
    </div>
  );
}

export default InputPanel;