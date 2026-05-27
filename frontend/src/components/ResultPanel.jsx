// src/components/ResultPanel.jsx
import { useState } from "react";

function ResultPanel({ result }) {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center text-gray-500 py-12">
          <div className="text-7xl mb-4 animate-bounce">📊</div>
          <p className="text-lg font-medium">No analysis yet</p>
          <p className="text-sm mt-2">Upload a resume and job description to see results</p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Parse different response formats
  let matchScore = 0;
  let matchedSkills = [];
  let missingSkills = [];
  let summary = "";
  let recommendations = [];
  
  if (typeof result === 'object') {
    matchScore = result.match_score || result.score || result.matchScore || 0;
    matchedSkills = result.matched_skills || result.matchedSkills || result.matched || [];
    missingSkills = result.missing_skills || result.missingSkills || result.gaps || [];
    summary = result.summary || result.description || "";
    recommendations = result.recommendations || result.suggestions || [];
  } else if (typeof result === 'string') {
    // Try to parse JSON string
    try {
      const parsed = JSON.parse(result);
      matchScore = parsed.match_score || parsed.score || 0;
      matchedSkills = parsed.matched_skills || parsed.matchedSkills || [];
      missingSkills = parsed.missing_skills || parsed.missingSkills || [];
      summary = parsed.summary || "";
      recommendations = parsed.recommendations || [];
    } catch (e) {
      // If not JSON, treat as plain text summary
      summary = result;
    }
  }

  // Determine color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', ring: 'ring-green-500', label: 'Excellent Match!' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', ring: 'ring-yellow-500', label: 'Good Match' };
    if (score >= 40) return { bg: 'bg-orange-100', text: 'text-orange-700', ring: 'ring-orange-500', label: 'Average Match' };
    return { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-500', label: 'Needs Improvement' };
  };
  
  const scoreColor = getScoreColor(matchScore);

  // Copy results to clipboard
  const copyResults = () => {
    const resultsText = `Match Score: ${matchScore}%\n\nMatched Skills (${matchedSkills.length}):\n${matchedSkills.join(', ')}\n\nMissing Skills (${missingSkills.length}):\n${missingSkills.join(', ')}\n\nSummary:\n${summary}\n\n${recommendations.length > 0 ? `Recommendations:\n${recommendations.join('\n')}` : ''}`;
    
    navigator.clipboard.writeText(resultsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download report as JSON
  const downloadReport = () => {
    const reportData = {
      matchScore,
      matchedSkills,
      missingSkills,
      summary,
      recommendations,
      timestamp: new Date().toISOString(),
      analysisDate: new Date().toLocaleString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>📈</span> Analysis Results
          </h2>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            {expanded ? '▼' : '▶'}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Match Score Section */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className={`text-7xl font-bold mb-2 ${scoreColor.text}`}>
                {matchScore}%
              </div>
              {matchScore >= 80 && (
                <div className="absolute -top-2 -right-6">
                  <span className="text-2xl">🎯</span>
                </div>
              )}
            </div>
            <div className={`text-sm font-semibold ${scoreColor.text} mb-2`}>
              {scoreColor.label}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  matchScore >= 80 ? 'bg-green-500' : 
                  matchScore >= 60 ? 'bg-yellow-500' :
                  matchScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${matchScore}%` }}
              ></div>
            </div>
            {matchScore >= 80 && (
              <div className="mt-3 text-green-600 text-sm font-medium bg-green-50 p-2 rounded-lg">
                🎉 Congratulations! You're a strong match for this position!
              </div>
            )}
          </div>

          {/* Matched Skills */}
          {matchedSkills && matchedSkills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                <span>✅</span> Matched Skills 
                <span className="text-sm text-gray-500 font-normal">
                  ({matchedSkills.length})
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                {matchedSkills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {missingSkills && missingSkills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-orange-700 flex items-center gap-2">
                <span>⚠️</span> Missing/Gap Skills
                <span className="text-sm text-gray-500 font-normal">
                  ({missingSkills.length})
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {missingSkills.length > 0 && (
                <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="font-medium text-blue-800 mb-1">💡 Quick Tips:</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Consider highlighting relevant experience with {missingSkills.slice(0, 3).join(', ')}</li>
                    <li>Add a learning section showing courses or certifications</li>
                    <li>Update your LinkedIn profile to include these keywords</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2 text-blue-700 flex items-center gap-2">
                <span>📝</span> Summary
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                {summary}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-purple-700 flex items-center gap-2">
                <span>💡</span> Recommendations
              </h3>
              <div className="space-y-2">
                {recommendations.map((rec, i) => (
                  <div key={i} className="bg-purple-50 p-3 rounded-lg text-sm text-gray-700">
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button 
              onClick={copyResults}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
            >
              {copied ? '✅ Copied!' : '📋 Copy Results'}
            </button>
            <button 
              onClick={downloadReport}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
            >
              💾 Download Report
            </button>
          </div>

          {/* Timestamp */}
          <div className="text-xs text-gray-400 text-center pt-2">
            Analysis generated at {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultPanel;