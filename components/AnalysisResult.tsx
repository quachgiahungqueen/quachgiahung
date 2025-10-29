
import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType;
  onReset: () => void;
}

const ConfidenceMeter: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  let strokeColor = 'stroke-green-400';
  if (score < 75) strokeColor = 'stroke-yellow-400';
  if (score < 50) strokeColor = 'stroke-orange-400';

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-slate-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={`transform -rotate-90 origin-center ${strokeColor}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{score}%</span>
    </div>
  );
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in">
      <div className="bg-slate-800 rounded-xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-grow">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Identification</h2>
              <p className="text-3xl font-bold text-white mt-1">{result.identification}</p>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
               <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Confidence</h3>
               <ConfidenceMeter score={result.confidenceScore} />
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-6 border-t border-slate-700">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">Detailed Analysis</h3>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{result.analysis}</p>
        </div>

        <div className="bg-slate-800/50 p-6 border-t border-slate-700">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">Estimated Value (USD)</h3>
          <p className="text-2xl font-bold text-white">{result.estimatedValue}</p>
        </div>
      </div>
       <div className="mt-8 text-center">
         <button
            onClick={onReset}
            className="px-8 py-3 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600 transition-colors"
         >
            Analyze Another
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
