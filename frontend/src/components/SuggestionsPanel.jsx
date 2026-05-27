function SuggestionsPanel({
  suggestions,
  loading,
  handleImprove,
  resume,
  jd,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-semibold">
          🚀 Resume Improvement
        </h2>

        <button
          disabled={loading}
          onClick={() =>
            handleImprove(
              resume,
              jd
            )
          }
          className="
          px-5
          py-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-600
          text-white
          hover:scale-105
          transition
          "
        >
          {
            loading
              ? "Generating..."
              : "Improve Resume"
          }
        </button>

      </div>

      {!suggestions && (
        <div className="text-gray-400">
          Generate recommendations
        </div>
      )}

      {suggestions && (
        <div className="space-y-5">

          <div>
            <h3 className="font-semibold">
              Missing Skills
            </h3>

            <div className="flex gap-2 flex-wrap mt-2">

              {suggestions.missing_skills?.map(
                (
                  skill,
                  i
                ) => (
                  <span
                    key={i}
                    className="
                    bg-red-100
                    text-red-600
                    px-3
                    py-1
                    rounded-full
                    "
                  >
                    {skill}
                  </span>
                )
              )}

            </div>
          </div>

          <div>

            <h3 className="font-semibold">
              Resources
            </h3>

            <ul className="mt-2 space-y-2">

              {suggestions.resources?.map(
                (
                  r,
                  i
                ) => (
                  <li
                    key={i}
                    className="
                    p-3
                    bg-slate-50
                    rounded-xl
                    "
                  >
                    {r}
                  </li>
                )
              )}

            </ul>

          </div>

          <div>

            <h3 className="font-semibold">
              Suggestions
            </h3>

            <p className="text-gray-600 mt-2">
              {
                suggestions.summary
              }
            </p>

          </div>

        </div>
      )}
    </div>
  );
}

export default SuggestionsPanel;