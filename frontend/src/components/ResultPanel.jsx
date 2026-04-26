import SkillTag from "./SkillTag";

function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <p className="text-gray-400">No analysis yet...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md space-y-4">

      <div>
        <p className="text-sm text-gray-500">Match Score</p>
        <p className="text-3xl font-bold text-[#6366F1]">
          {Math.round(result.match_score * 100)}%
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Matched Skills</p>
        <div className="flex gap-2 flex-wrap">
          {result.matched_skills.map((s, i) => (
            <SkillTag key={i} text={s} type="matched" />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Missing Skills</p>
        <div className="flex gap-2 flex-wrap">
          {result.missing_skills.map((s, i) => (
            <SkillTag key={i} text={s} type="missing" />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Summary</p>
        <p>{result.summary}</p>
      </div>

    </div>
  );
}

export default ResultPanel;