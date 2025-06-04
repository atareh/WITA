import { useState } from 'react';
import { CAModal } from './CAModal';

export function AnalysisHeader() {
  const [showCAModal, setShowCAModal] = useState(false);
  const ca = "9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL";

  const getTruncatedCA = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return `${ca.slice(0, 5)}.....${ca.slice(-5)}`;
    }
    return ca;
  };

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-4 pt-10 pb-6">
        <div className="flex justify-center w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowCAModal(true)}
              className="inline-flex items-center justify-center rounded-full overflow-hidden px-3 py-1 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer font-sans text-sm h-8 min-w-[120px] text-black"
            >
              ca: {getTruncatedCA()}
            </button>
            <a 
              href="https://x.com/whoistheahole" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full overflow-hidden px-2 py-1 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer h-8 min-w-[60px]"
            >
              <img 
                src="https://github.com/atareh/WITA/blob/main/X-logo.png?raw=true" 
                alt="X Logo" 
                className="h-6 w-auto transition-transform hover:scale-110"
              />
            </a>
            <a 
              href="https://dexscreener.com/solana/9mue3ziouunujjfbaquxpw8aa1jwhqz93wjdzs63nwxf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full overflow-hidden px-2 py-1 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer h-8 min-w-[60px]"
            >
              <img 
                src="https://github.com/atareh/WITA/blob/main/DS.png?raw=true" 
                alt="Dex Logo" 
                className="h-6 w-auto transition-transform hover:scale-110"
              />
            </a>
          </div>
        </div>
      </header>

      <CAModal 
        isOpen={showCAModal}
        onClose={() => setShowCAModal(false)}
      />
    </>
  );
}