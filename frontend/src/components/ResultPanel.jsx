function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="bg-white/70 p-6 rounded-2xl shadow-xl border flex items-center justify-center">
        <p className="text-gray-500">No results yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border">

      {/* SCORE */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-600">Match Score</h2>
        <p className="text-4xl font-bold text-indigo-600">
          {result.match_score}%
        </p>
      </div>

      {/* MATCHED */}
      <div className="mb-4">
        <h3 className="font-semibold text-green-600 mb-2">
          Matched Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.matched_skills.map((skill, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* MISSING */}
      <div className="mb-4">
        <h3 className="font-semibold text-red-600 mb-2">
          Missing Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.missing_skills.map((skill, i) => (
            <span
              key={i}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">
          Summary
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {result.summary}
        </p>
      </div>
    </div>
  );
}

export default ResultPanel;