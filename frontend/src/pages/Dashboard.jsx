import { useState } from "react";
import Header from "../components/Header";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import { analyzeResume } from "../services/api";

function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const data = await analyzeResume(resume, jd);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F2EAE0] p-6">
      <Header />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <InputPanel
          setResume={setResume}
          setJd={setJd}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />
        <ResultPanel result={result} />
      </div>
    </div>
  );
}

export default Dashboard;