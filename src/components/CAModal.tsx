import { X } from 'lucide-react';
import { useState } from 'react';

interface CAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CAModal({ isOpen, onClose }: CAModalProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [copyPosition, setCopyPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleCopy = (e: React.MouseEvent) => {
    const ca = "9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL";
    navigator.clipboard.writeText(ca);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setCopyPosition({
      x: rect.right + 10,
      y: rect.top + (rect.height / 2)
    });
    
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-white/95 text-black flex items-center justify-center z-50 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors"
      >
        <X size={24} />
      </button>
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <img 
            src="https://raw.githubusercontent.com/atareh/WITA/main/man-yelling-new.png" 
            alt="Coin Logo" 
            className="w-24 md:w-40 h-auto mb-4 md:mb-6" 
          />
          <h1 className="text-3xl md:text-5xl font-galindo mb-2 md:mb-4">$WITA</h1>
          <p className="text-sm md:text-lg max-w-xl mb-6 md:mb-8 text-center">
            Who is the A-hole is an AI argument analyzer that tells you who is right and wrong in an argument. Soon you can tag a bot on X to analyze the spiciest of arguments.
          </p>
          
          <a 
            href="https://jup.ag/swap/SOL-9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white text-base md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors mb-4 md:mb-6"
          >
            <img 
              src="https://blog.dextrading.com//uploads/2025-1-19-50883388-Jupiter.jpg" 
              alt="wallet icon" 
              className="w-6 h-6 md:w-8 md:h-8"
            />
            Buy $WITA
          </a>
          
          <div className="flex gap-4 mb-4">
            <a 
              href="https://dexscreener.com/solana/9mue3ziouunujjfbaquxpw8aa1jwhqz93wjdzs63nwxf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://raw.githubusercontent.com/atareh/WITA/main/DS.png" 
                alt="DexScreener" 
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity"
              />
            </a>
            <a 
              href="https://x.com/whoistheahole"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://raw.githubusercontent.com/atareh/WITA/main/X-logo.png" 
                alt="X (Twitter)" 
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
          
          <div className="text-base md:text-lg mb-2">
            $WITA is built on the Solana Blockchain
          </div>
          
          <button
            onClick={handleCopy}
            className="text-xs md:text-sm mb-6 md:mb-8 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer relative"
          >
            9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL
            {showCopied && (
              <span 
                className="absolute bg-black text-white text-xs py-1 px-2 rounded"
                style={{
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                Copied!
              </span>
            )}
          </button>
          
          <p className="text-[8px] md:text-[10px] text-gray-600 max-w-3xl text-center px-4">
            WITA coins are intended to function as an expression of support for, and engagement with, the ideals and beliefs embodied by the symbol "$WITA" and the associated artwork, and are not intended to be, or to be the subject of, an investment opportunity, investment contract, or security of any type. By acquiring WITA COIN you expressly acknowledge and agree that you acquire no rights to ownership, control, or management of any entity. $WITA is not available to persons or entities in restricted jurisdictions. Users acknowledge that digital assets involve inherent risks and potential for complete loss. Price data displayed on the site is from DEXScreener and may be delayed or inaccurate. Always verify current market price through multiple sources before trading. Nothing on this site constitutes financial, legal, or investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}