import { motion } from "framer-motion";

function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="bg-white/70 p-6 rounded-2xl shadow-xl border flex items-center justify-center">
        <p className="text-gray-400">Upload resume to see insights</p>
      </div>
    );
  }

  const score = result.match_score;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border"
    >
      {/* 🔥 Circular Score */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full">
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="54"
              stroke="#6366f1"
              strokeWidth="10"
              fill="none"
              strokeDasharray={339}
              strokeDashoffset={339 - (score / 100) * 339}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 339 }}
              animate={{ strokeDashoffset: 339 - (score / 100) * 339 }}
              transition={{ duration: 1 }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {score}%
            </span>
          </div>
        </div>

        <p className="text-gray-600 mt-2">Match Score</p>
      </div>

      {/* 🔥 Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-indigo-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* ✅ Matched */}
      <div className="mb-4">
        <h3 className="font-semibold text-green-600 mb-2">
          Matched Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.matched_skills.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ❌ Missing */}
      <div className="mb-4">
        <h3 className="font-semibold text-red-600 mb-2">
          Missing Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.missing_skills.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 🧠 Summary */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">
          Summary
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {result.summary}
        </p>
      </div>
    </motion.div>
  );
}

export default ResultPanel;