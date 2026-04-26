import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: resume,
        job_description: jobDesc,
      });

      setResult(res.data.ai_response);
    } catch (err) {
      console.error(err);
      alert("Error analyzing");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Career Copilot</h1>

      <textarea
        placeholder="Paste Resume"
        rows={6}
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Paste Job Description"
        rows={6}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Match Score: {result.match_score}</h2>

          <p><b>Matched Skills:</b> {result.matched_skills.join(", ")}</p>

          <p><b>Missing Skills:</b> {result.missing_skills.join(", ")}</p>

          <p><b>Summary:</b> {result.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;