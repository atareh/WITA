import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import { Check, AlertCircle } from 'lucide-react';
import { annotateImage } from '../utils/imageAnnotation';
import { AnalysisHeader } from './AnalysisHeader';
import { ProgressIndicator } from './ProgressIndicator';

export function NamingStep() {
  const navigate = useNavigate();
  const {
    screenshots,
    leftSideName,
    rightSideName,
    setLeftSideName,
    setRightSideName,
    setScreenshots,
    setCurrentStep,
  } = useAnalysisStore();

  const [errors, setErrors] = useState({ left: '', right: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [annotationError, setAnnotationError] = useState<string | null>(null);
  const [previousNames, setPreviousNames] = useState({ left: '', right: '' });

  useEffect(() => {
    if (screenshots.length === 0) {
      navigate('/analyze');
    }
  }, [screenshots, navigate]);

  const updateAnnotations = useCallback(async () => {
    if (leftSideName === previousNames.left && rightSideName === previousNames.right) {
      return;
    }

    if (!leftSideName || !rightSideName) return;
    
    setIsUpdating(true);
    setAnnotationError(null);
    
    try {
      const updatedScreenshots = await Promise.all(
        screenshots.map(async (screenshot) => {
          try {
            const annotated = await annotateImage(
              screenshot.preview,
              leftSideName,
              rightSideName
            );
            return { ...screenshot, annotated };
          } catch (err) {
            console.error('Failed to annotate screenshot:', err);
            return screenshot;
          }
        })
      );

      setScreenshots(updatedScreenshots);
      setPreviousNames({ left: leftSideName, right: rightSideName });
    } catch (err) {
      console.error('Failed to update screenshots:', err);
      setAnnotationError('Failed to update annotations. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  }, [leftSideName, rightSideName, screenshots, setScreenshots, previousNames]);

  useEffect(() => {
    const timeoutId = setTimeout(updateAnnotations, 500);
    return () => clearTimeout(timeoutId);
  }, [updateAnnotations]);

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 30) return 'Name must be less than 30 characters';
    return '';
  };

  const handleNameChange = (side: 'left' | 'right', value: string) => {
    const error = validateName(value);
    setErrors({ ...errors, [side]: error });
    
    if (side === 'left') {
      setLeftSideName(value);
    } else {
      setRightSideName(value);
    }
  };

  const handleNext = () => {
    const leftError = validateName(leftSideName);
    const rightError = validateName(rightSideName);

    if (leftError || rightError) {
      setErrors({ left: leftError, right: rightError });
      return;
    }

    setCurrentStep(3);
    navigate('/analyze/context');
  };

  return (
    <div className="min-h-screen bg-[#FFF4E6] px-4">
      <AnalysisHeader />
      <section className="pt-10 pb-16">
        <h1 className="text-5xl font-galindo text-[#DB0001] text-center mb-2">WITA</h1>
        <h2 className="text-2xl md:text-3xl font-galindo text-center mb-10">2. Add Names</h2>

        <div className="container mx-auto mb-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex-shrink-0">
              <img
                src="https://raw.githubusercontent.com/atareh/WITA/main/judge.png"
                alt="Judge"
                className="w-60 md:w-80"
              />
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-8 w-full max-w-2xl shadow-lg">
              {annotationError && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {annotationError}
                </div>
              )}

              {screenshots.length > 0 && (
                <div className="mb-8 relative">
                  <img
                    src={screenshots[0].annotated || screenshots[0].preview}
                    alt="First screenshot"
                    className="w-full rounded-lg shadow-md"
                  />
                  {isUpdating && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Left side name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={leftSideName}
                      onChange={(e) => handleNameChange('left', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.left
                          ? 'border-red-500 focus:ring-red-200'
                          : leftSideName
                          ? 'border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Enter name"
                    />
                    {leftSideName && !errors.left && (
                      <Check className="absolute right-3 top-3 text-green-500" size={20} />
                    )}
                    {errors.left && (
                      <AlertCircle className="absolute right-3 top-3 text-red-500" size={20} />
                    )}
                  </div>
                  {errors.left && (
                    <p className="text-sm text-red-500 mt-1">{errors.left}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    Right side name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rightSideName}
                      onChange={(e) => handleNameChange('right', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-right ${
                        errors.right
                          ? 'border-red-500 focus:ring-red-200'
                          : rightSideName
                          ? 'border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Enter name"
                      style={{ direction: 'rtl' }}
                    />
                    {rightSideName && !errors.right && (
                      <Check className="absolute right-3 top-3 text-green-500" size={20} />
                    )}
                    {errors.right && (
                      <AlertCircle className="absolute right-3 top-3 text-red-500" size={20} />
                    )}
                  </div>
                  {errors.right && (
                    <p className="text-sm text-red-500 mt-1 text-right">{errors.right}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    navigate('/analyze');
                  }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!leftSideName || !rightSideName || isUpdating}
                  className="px-6 py-3 bg-[#0658D6] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all duration-200 min-w-[100px]"
                >
                  {isUpdating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <ProgressIndicator />
      </section>
    </div>
  );
}