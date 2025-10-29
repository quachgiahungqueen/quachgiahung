
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-cyan-400 border-t-transparent"></div>
      <p className="text-lg font-medium text-slate-300">Consulting with our AI Geologist...</p>
      <p className="text-sm text-slate-500">This may take a moment.</p>
    </div>
  );
};

export default Loader;
