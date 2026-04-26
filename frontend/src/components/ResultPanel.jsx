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

      {/* Score */}
      <div>
        <p className="text-sm text-gray-500">Match Score</p>

        {/* ✅ FIXED HERE */}
        <p className="text-3xl font-bold text-[#6366F1]">
          {Math.round(result.match_score)}%
        </p>
      </div>

      {/* Matched Skills */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Matched Skills</p>
        <div className="flex flex-wrap gap-2">
          {result.matched_skills.map((s, i) => (
            <SkillTag key={i} text={s} type="matched" />
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Missing Skills</p>
        <div className="flex flex-wrap gap-2">
          {result.missing_skills.map((s, i) => (
            <SkillTag key={i} text={s} type="missing" />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Summary</p>
        <p className="text-gray-700">{result.summary}</p>
      </div>

    </div>
  );
}

export default ResultPanel;