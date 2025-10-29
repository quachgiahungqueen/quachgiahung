
import React from 'react';
import StoneIcon from './icons/StoneIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-4 sm:p-6 text-white border-b border-slate-700/50">
      <div className="flex items-center justify-center gap-3">
        <StoneIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
          Geo-AI Analyst
        </h1>
      </div>
      <p className="mt-2 text-sm sm:text-base text-slate-400">
        Upload an image to identify meteorites, gemstones, and rocks with expert AI analysis.
      </p>
    </header>
  );
};

export default Header;
