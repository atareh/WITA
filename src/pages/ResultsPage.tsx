import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { AnalysisHeader } from '../components/AnalysisHeader';
import { ShareCardModal } from '../components/ShareCardModal';
import { Toaster, toast } from 'react-hot-toast';

interface AnalysisCard {
  title: string;
  content: string;
  isIntro?: boolean;
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const reset = useAnalysisStore((state) => state.reset);
  const analysis = location.state?.analysis;
  const initialShareData = location.state?.shareData;
  const [shareData, setShareData] = useState(initialShareData);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [analysisCards, setAnalysisCards] = useState<AnalysisCard[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analysis) {
      navigate('/analyze');
      return;
    }

    const sections = analysis.split('##').filter(Boolean);
    const cards = sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      const isIntro = index === 0;
      return { title, content, isIntro };
    });

    setAnalysisCards(cards);

    if (!shareData && analysis.includes('*****WITA_JSON_DELIMITER*****')) {
      const [visibleText, metadataBlock] = analysis.split('*****WITA_JSON_DELIMITER*****');
      try {
        const parsed = JSON.parse(metadataBlock.trim());
        setShareData(parsed);
      } catch (e) {
        console.error('Failed to parse share metadata:', e);
        toast.error('Failed to prepare sharing data');
      }
    }
  }, [analysis, navigate, shareData]);

  const handleSave = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFF4E6'
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'wita-analysis.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to save analysis:', err);
      setError('Failed to save analysis as image');
    }
  };

  const handleNewAnalysis = () => {
    reset();
    navigate('/analyze');
  };

  const handleShare = () => {
    if (!shareData) {
      toast.error('Share data is missing');
      return;
    }
    setShowShareModal(true);
  };

  if (!analysis) return null;

  return (
    <div className="min-h-screen bg-[#FFF4E6] text-[#000]">
      <Toaster position="top-center" />
      <AnalysisHeader />
      <div className="text-center py-10">
        <h1 className="text-5xl font-galindo text-[#DB0001] mb-2">WITA</h1>
        <h2 className="text-2xl md:text-3xl font-galindo">Analysis Results</h2>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6" ref={contentRef}>
          {analysisCards.map((card, index) => (
            card.isIntro ? (
              <div key={index} className="text-gray-800 text-lg mb-6 px-2">
                {card.content}
              </div>
            ) : (
              <div 
                key={index} 
                className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-lg"
              >
                <div className={`px-6 py-4 ${index % 2 === 1 ? 'bg-[#DB0001]' : 'bg-[#0658D6]'}`}>
                  <h3 className="text-xl md:text-2xl font-galindo text-white">
                    {card.title}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="prose prose-lg max-w-none [&>*:last-child]:mb-0">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="text-gray-800 mb-4 text-lg" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                        li: ({node, children, ...props}) => {
                          const content = children?.toString() || '';
                          const isBold = content.startsWith('**') && content.includes('**');
                          
                          if (isBold) {
                            const [boldText, ...rest] = content.split('**').filter(Boolean);
                            return (
                              <li className="mb-4" {...props}>
                                <strong className={index % 2 === 1 ? 'text-[#DB0001]' : 'text-[#0658D6]'} block mb-2>{boldText}</strong>
                                {rest.join('').trim()}
                              </li>
                            );
                          }
                          
                          return <li className="text-gray-800 mb-2" {...props}>{children}</li>;
                        },
                        strong: ({node, ...props}) => (
                          <strong className={`font-bold ${index % 2 === 1 ? 'text-[#DB0001]' : 'text-[#0658D6]'}`} {...props} />
                        ),
                        em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                        blockquote: ({node, ...props}) => (
                          <blockquote className={`border-l-4 ${index % 2 === 1 ? 'border-[#DB0001]' : 'border-[#0658D6]'} pl-4 my-6 text-gray-700 italic`} {...props} />
                        ),
                      }}
                    >
                      {card.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )
          ))}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={handleSave}
              className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-bold"
            >
              Save Analysis
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleNewAnalysis}
              className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-bold"
            >
              New Analysis
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-bold"
            >
              Share on X
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {shareData && (
        <ShareCardModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareData={shareData}
        />
      )}

      <footer className="text-xs text-black text-center py-6 px-6 bg-[#f3e9dc]">
        2025 WITA<br />an AS experience
      </footer>
    </div>
  );
}