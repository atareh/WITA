import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import { Sparkles } from 'lucide-react';
import { AnalysisHeader } from './AnalysisHeader';
import { ProgressIndicator } from './ProgressIndicator';
import { Toaster, toast } from 'react-hot-toast';

export function ConfirmStep() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { screenshots, leftSideName, rightSideName, context, setCurrentStep } = useAnalysisStore();

  useEffect(() => {
    if (screenshots.length === 0) {
      navigate('/analyze');
    }
  }, [screenshots, navigate]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

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
          rightSideName,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      console.log('Received analysis data:', data);
      
      if (!data.analysis) {
        throw new Error('No analysis received');
      }

      navigate('/analyze/results', { 
        state: { 
          analysis: data.analysis,
          shareData: data.shareData 
        } 
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Analysis error:', err);
      setError(message);
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E6] px-4">
      <Toaster position="top-center" />
      <AnalysisHeader />
      <section className="pt-10 pb-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-galindo text-[#DB0001] mb-2">WITA</h1>
          <h2 className="text-2xl md:text-3xl font-galindo text-center mb-10">Analyze Conversation</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto text-center mb-32">
          <img 
            src="https://raw.githubusercontent.com/atareh/WITA/main/judge-final.png" 
            alt="Judge" 
            className="w-72 md:w-80" 
          />

          {error && (
            <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-[#0658D6] text-white font-bold py-2 px-6 rounded-md text-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                Analyze Conversation
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentStep(3);
              navigate('/analyze/context');
            }}
            className="text-black font-bold mt-2 hover:text-gray-700 transition-colors"
          >
            Back
          </button>
        </div>

        <ProgressIndicator />
      </section>
    </div>
  );
}