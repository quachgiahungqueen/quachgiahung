
import React, { useState, useRef, useCallback } from 'react';
import UploadIcon from './icons/UploadIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onAnalyze, isLoading, imagePreviewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-xl p-6 text-center transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {!imagePreviewUrl ? (
          <label 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="cursor-pointer flex flex-col items-center justify-center space-y-4"
            onClick={triggerFileSelect}>
            <UploadIcon className="w-12 h-12 text-slate-400" />
            <div className="text-slate-300">
              <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-slate-500">PNG, JPG or WEBP</p>
          </label>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg shadow-black/30">
              <img src={imagePreviewUrl} alt="Selected rock" className="w-full h-auto object-cover" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                 <button
                    onClick={triggerFileSelect}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-2 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50"
                 >
                    Change Image
                </button>
                 <button
                    onClick={onAnalyze}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>{isLoading ? 'Analyzing...' : 'Analyze Image'}</span>
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
