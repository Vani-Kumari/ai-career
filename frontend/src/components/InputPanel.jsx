function InputPanel({ setResume, setJd, handleAnalyze, loading }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-3">Resume</h2>

      <textarea
        className="w-full h-40 border p-3 rounded-lg mb-3"
        onChange={(e) => setResume(e.target.value)}
      />

      <h2 className="font-semibold mb-3">Job Description</h2>

      <textarea
        className="w-full h-40 border p-3 rounded-lg"
        onChange={(e) => setJd(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="w-full mt-4 bg-[#6366F1] text-white py-2 rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}

export default InputPanel;