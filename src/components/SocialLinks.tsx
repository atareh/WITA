import React from 'react';

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://x.com/whoistheahole"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <img
          src="https://icon2.cleanpng.com/20240119/rp/transparent-x-logo-cross-design-black-and-white-photograph-sim-black-and-white-cross-with-letters-x-and-1710898892931.webp"
          alt="X (Twitter)"
          className="w-6 h-6"
        />
      </a>
      <a
        href="https://dexscreener.com/solana/9mue3ziouunujjfbaquxpw8aa1jwhqz93wjdzs63nwxf"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <img
          src="https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/05022926/dex-screener-seeklogo.png"
          alt="DexScreener"
          className="w-6 h-6"
        />
      </a>
    </div>
  );
}