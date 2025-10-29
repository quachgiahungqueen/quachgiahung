
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import AnalysisResult from './components/AnalysisResult';
import { analyzeRockImage } from './services/geminiService';
import { AnalysisResult as AnalysisResultType } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
  };
  
  const resetState = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeRockImage(imageFile);
      setAnalysisResult(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Analysis Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center">
      <Header />
      <main className="w-full flex-grow flex flex-col items-center justify-center p-4">
        {!analysisResult && (
          <ImageUploader
            onImageSelect={handleImageSelect}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            imagePreviewUrl={imagePreviewUrl}
          />
        )}
        
        {isLoading && <Loader />}

        {error && !isLoading && (
          <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-red-400">An Error Occurred</h3>
            <p className="mt-2 text-red-300">{error}</p>
            <button
                onClick={resetState}
                className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition-colors"
            >
                Try Again
            </button>
          </div>
        )}

        {analysisResult && !isLoading && !error && (
            <AnalysisResult result={analysisResult} onReset={resetState} />
        )}

      </main>
      <footer className="p-4 text-center text-xs text-slate-600">
        <p>Geo-AI Analyst. Powered by Gemini. For educational and entertainment purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
