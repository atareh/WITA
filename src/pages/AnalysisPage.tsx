import React, { useState, useEffect } from 'react';
import { Upload, MoveUp, MoveDown, Send, Trash2, ImagePlus, Download, RefreshCw } from 'lucide-react';
import { AnnotationModal } from '../components/AnnotationModal';
import { annotateImage } from '../utils/imageAnnotation';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

interface Screenshot {
  id: string;
  file: File;
  preview: string;
  annotated?: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
  type?: 'openai_error' | 'general_error';
}

export default function AnalysisPage() {
  const navigate = useNavigate();
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [leftSideName, setLeftSideName] = useState('');
  const [rightSideName, setRightSideName] = useState('');
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState<Screenshot | null>(null);

  useEffect(() => {
    if (leftSideName.trim() && rightSideName.trim() && screenshots.length > 0) {
      const firstScreenshot = screenshots[0];
      if (!firstScreenshot.annotated) {
        setCurrentScreenshot(firstScreenshot);
        setShowAnnotationModal(true);
      }
    }
  }, [leftSideName, rightSideName]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (screenshots.length + files.length > 30) {
      setError({
        error: 'Maximum limit exceeded',
        details: 'Maximum 30 screenshots allowed'
      });
      return;
    }

    const newScreenshots = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));

    setScreenshots(prev => [...prev, ...newScreenshots]);
    setError(null);

    if (leftSideName.trim() && rightSideName.trim() && screenshots.length === 0) {
      setTimeout(() => {
        setCurrentScreenshot(newScreenshots[0]);
        setShowAnnotationModal(true);
      }, 0);
    }
  };

  const annotateAllScreenshots = async () => {
    const updatedScreenshots = await Promise.all(
      screenshots.map(async (screenshot) => {
        if (screenshot.annotated) return screenshot;
        
        const annotated = await annotateImage(
          screenshot.preview,
          leftSideName,
          rightSideName
        );
        
        return {
          ...screenshot,
          annotated
        };
      })
    );
    
    setScreenshots(updatedScreenshots);
  };

  const handleAnnotate = async (id: string, annotatedImage: string) => {
    setScreenshots(prev =>
      prev.map(screenshot =>
        screenshot.id === id
          ? { ...screenshot, annotated: annotatedImage }
          : screenshot
      )
    );

    setShowAnnotationModal(false);
    setCurrentScreenshot(null);

    await annotateAllScreenshots();
  };

  const handleSkipAnnotation = () => {
    setShowAnnotationModal(false);
    setCurrentScreenshot(null);
  };

  const moveScreenshot = (index: number, direction: 'up' | 'down') => {
    const newScreenshots = [...screenshots];
    if (direction === 'up' && index > 0) {
      [newScreenshots[index], newScreenshots[index - 1]] = [newScreenshots[index - 1], newScreenshots[index]];
    } else if (direction === 'down' && index < screenshots.length - 1) {
      [newScreenshots[index], newScreenshots[index + 1]] = [newScreenshots[index + 1], newScreenshots[index]];
    }
    setScreenshots(newScreenshots);
  };

  const removeScreenshot = (id: string) => {
    setScreenshots(screenshots.filter(screenshot => screenshot.id !== id));
  };

  const analyzeScreenshots = async () => {
    if (!leftSideName.trim() || !rightSideName.trim()) {
      setError({
        error: 'Missing names',
        details: 'Please provide names for both sides of the conversation'
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const base64Screenshots = await Promise.all(
        screenshots.map(async (screenshot) => {
          if (screenshot.annotated) {
            return screenshot.annotated;
          }
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(screenshot.file);
          });
        })
      );

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/WITA`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          screenshots: base64Screenshots,
          leftSideName,
          rightSideName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError({
        error: 'Analysis failed',
        details: err instanceof Error ? err.message : 'An unexpected error occurred',
        type: 'general_error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAsPDF = () => {
    if (!analysis) return;

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(24);
    doc.text('WITA Analysis', 20, 20);
    
    // Add content
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(analysis, 170);
    doc.text(splitText, 20, 40);
    
    // Save the PDF
    doc.save('wita-analysis.pdf');
  };

  const handleNewAnalysis = () => {
    // Reset all state
    setScreenshots([]);
    setAnalysis(null);
    setError(null);
    setLeftSideName('');
    setRightSideName('');
    setShowAnnotationModal(false);
    setCurrentScreenshot(null);
    
    // Navigate back to the upload page
    navigate('/analyze');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Screenshot Analysis</h1>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Upload Screenshots ({screenshots.length}/30)
            </h2>
            <label className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <ImagePlus size={20} />
              Add Screenshots
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={screenshots.length >= 30}
              />
            </label>
          </div>

          {/* Name Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="leftSideName" className="block text-gray-700 text-sm font-medium mb-2">
                Left Side Name:
              </label>
              <input
                type="text"
                id="leftSideName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={leftSideName}
                onChange={(e) => setLeftSideName(e.target.value)}
                placeholder="Enter name for left side"
                required
              />
            </div>
            <div>
              <label htmlFor="rightSideName" className="block text-gray-700 text-sm font-medium mb-2">
                Right Side Name:
              </label>
              <input
                type="text"
                id="rightSideName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={rightSideName}
                onChange={(e) => setRightSideName(e.target.value)}
                placeholder="Enter name for right side"
                required
              />
            </div>
          </div>
        </div>

        {/* Screenshots List */}
        {screenshots.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Arrange Screenshots</h2>
            <p className="text-gray-600 mb-6">
              This is a conversation between <span className="font-semibold">{leftSideName || '[Left Side]'}</span> and <span className="font-semibold">{rightSideName || '[Right Side]'}</span>
            </p>
            <div className="space-y-4">
              {screenshots.map((screenshot, index) => (
                <div key={screenshot.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg font-semibold text-gray-600">{index + 1}</span>
                  <img 
                    src={screenshot.annotated || screenshot.preview} 
                    alt={`Screenshot ${index + 1}`} 
                    className="w-32 h-32 object-cover rounded" 
                  />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">{screenshot.file.name}</p>
                    {screenshot.annotated && (
                      <span className="text-xs text-green-600">Annotated</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveScreenshot(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-red-600 disabled:opacity-50"
                    >
                      <MoveUp size={20} />
                    </button>
                    <button
                      onClick={() => moveScreenshot(index, 'down')}
                      disabled={index === screenshots.length - 1}
                      className="p-2 text-gray-600 hover:text-red-600 disabled:opacity-50"
                    >
                      <MoveDown size={20} />
                    </button>
                    <button
                      onClick={() => removeScreenshot(screenshot.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={analyzeScreenshots}
              disabled={isAnalyzing || screenshots.length === 0 || !leftSideName.trim() || !rightSideName.trim()}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Send size={20} />
                  Analyze Screenshots
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error.error}</h3>
                {error.details && (
                  <p className="mt-1 text-sm text-red-700">{error.details}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Analysis Results</h2>
            <div className="prose max-w-none">
              {analysis.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleSaveAsPDF}
                className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition flex items-center gap-2 font-bold"
              >
                <Download size={20} />
                Save Conversation
              </button>
              <button
                onClick={handleNewAnalysis}
                className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition flex items-center gap-2 font-bold"
              >
                <RefreshCw size={20} />
                New Analysis
              </button>
            </div>
          </div>
        )}

        {/* Annotation Modal */}
        {currentScreenshot && (
          <AnnotationModal
            isOpen={showAnnotationModal}
            onClose={() => {
              setShowAnnotationModal(false);
              setCurrentScreenshot(null);
            }}
            screenshot={currentScreenshot}
            onAnnotate={handleAnnotate}
            onSkip={handleSkipAnnotation}
            leftSideName={leftSideName}
            rightSideName={rightSideName}
          />
        )}
      </div>
    </div>
  );
}