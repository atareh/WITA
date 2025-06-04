import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SharePage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('result_image_url, error_message')
          .eq('shareable_id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Analysis not found');

        setAnalysis(data.result_image_url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF4E6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#DB0001] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF4E6] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-[#DB0001] mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4E6] text-[#000]">
      <div className="text-center py-10">
        <h1 className="text-5xl font-galindo text-[#DB0001] mb-2">WITA</h1>
        <h2 className="text-2xl md:text-3xl font-galindo">Shared Analysis</h2>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-black rounded-xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h2 className="text-3xl font-galindo text-[#DB0001] mb-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-galindo text-[#0658D6] mb-4 mt-8" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-4 mt-6" {...props} />,
                  p: ({node, ...props}) => {
                    const content = props.children?.toString() || '';
                    if (content.startsWith("If you're sharing this with anyone, I'd say:")) {
                      return (
                        <div className="mt-8 mb-6">
                          <h2 className="text-2xl font-galindo text-[#0658D6] mb-4">If you're sharing this with anyone, I'd say:</h2>
                          <p className="text-gray-800 text-lg">{content.replace("If you're sharing this with anyone, I'd say:", "").trim()}</p>
                        </div>
                      );
                    }
                    return <p className="text-gray-800 mb-4 text-lg" {...props} />;
                  },
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal mb-6 space-y-2 pl-0" {...props} />,
                  li: ({node, children, ...props}) => {
                    const content = children?.toString() || '';
                    const isBold = content.startsWith('**') && content.includes('**');
                    
                    if (isBold) {
                      const [boldText, ...rest] = content.split('**').filter(Boolean);
                      return (
                        <li className="mb-4" {...props}>
                          <strong className="text-[#DB0001] block mb-2">{boldText}</strong>
                          {rest.join('').trim()}
                        </li>
                      );
                    }
                    
                    return <li className="text-gray-800 mb-2" {...props}>{children}</li>;
                  },
                  strong: ({node, ...props}) => <strong className="font-bold text-[#DB0001]" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-[#0658D6] pl-4 my-6 text-gray-700 italic" {...props} />
                  ),
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-xs text-black text-center py-6 px-6 bg-[#f3e9dc]">
        2025 WITA<br />an AS experience
      </footer>
    </div>
  );
}