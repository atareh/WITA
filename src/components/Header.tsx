import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const copyToClipboard = () => {
    const text = "9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL";
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard: " + text);
    }, err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <header className="flex flex-col items-center justify-center gap-4 pt-10 pb-6 bg-[#DB0001]">
      <div className="flex justify-center w-full">
        <Link to="/" className="text-3xl font-galindo text-white">
          WITA
        </Link>
      </div>
      <nav className="flex items-center gap-4 flex-wrap justify-center px-6">
        <button 
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center rounded-full overflow-hidden px-4 py-2 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer font-sans text-sm h-10 min-w-[120px] text-white"
        >
          ca: 9tgTbD1QqxFPtk7XwxcjzSrYNkHpmPYPRsmg6QH8GXvL
        </button>
        <a 
          href="https://x.com/whoistheahole" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full overflow-hidden px-3 py-2 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer h-10 min-w-[60px]"
        >
          <img 
            src="https://github.com/atareh/WITA/blob/main/X-logo.png?raw=true" 
            alt="X Logo" 
            className="h-8 w-auto transition-transform hover:scale-110"
          />
        </a>
        <a 
          href="https://dexscreener.com/solana/9mue3ziouunujjfbaquxpw8aa1jwhqz93wjdzs63nwxf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full overflow-hidden px-3 py-2 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer h-10 min-w-[60px]"
        >
          <img 
            src="https://github.com/atareh/WITA/blob/main/DS.png?raw=true" 
            alt="Dex Logo" 
            className="h-8 w-auto transition-transform hover:scale-110"
          />
        </a>
      </nav>
    </header>
  );
}