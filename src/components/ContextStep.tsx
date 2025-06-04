import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import { AnalysisHeader } from './AnalysisHeader';
import { ProgressIndicator } from './ProgressIndicator';

export function ContextStep() {
  const navigate = useNavigate();
  const { screenshots, context, setContext, setCurrentStep } = useAnalysisStore();

  useEffect(() => {
    if (screenshots.length === 0) {
      navigate('/analyze');
    }
  }, [screenshots, navigate]);

  const handleNext = () => {
    setCurrentStep(4);
    navigate('/analyze/confirm');
  };

  return (
    <div className="min-h-screen bg-[#FFF4E6] px-4">
      <AnalysisHeader />
      <section className="pt-10 pb-16">
        <h1 className="text-5xl font-galindo text-[#DB0001] text-center mb-2">WITA</h1>
        <h2 className="text-2xl md:text-3xl font-galindo text-center mb-10">3. Add Missing Context</h2>

        <div className="container mx-auto mb-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex-shrink-0">
              <img
                src="https://raw.githubusercontent.com/atareh/WITA/main/judge-2-context.png"
                alt="Judge"
                className="w-60 md:w-80"
              />
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-8 w-full max-w-2xl shadow-lg">
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context (Optional)
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Add any background information that would help understand the situation better.
                </p>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full h-40 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Enter additional context..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    navigate('/analyze/names');
                  }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#0658D6] text-white rounded-lg hover:bg-blue-700 font-bold transition-all duration-200 min-w-[100px]"
                >
                  {context.trim() ? 'Next' : 'Skip'}
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