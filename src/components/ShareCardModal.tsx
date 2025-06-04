import { useState, useEffect, useRef } from 'react';
import { X, Copy, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    analysis: string;
    verdictName: string;
    verdictLine2: string;
  };
}

export function ShareCardModal({ isOpen, onClose, shareData }: ShareCardModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const generateShareCardUrl = () => {
    if (!shareData) {
      console.error('No share data provided');
      return null;
    }

    const params = new URLSearchParams({
      title: shareData.title,
      analysis: shareData.analysis,
      verdict: shareData.verdictName,
    });

    return `https://v0-wita-social-share-card.vercel.app/api/generate-card?${params.toString()}`;
  };

  const handleCopyImage = async () => {
    const url = generateShareCardUrl();
    if (!url) {
      toast.error('Failed to generate share card');
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      toast.success('Image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image:', err);
      toast.error('Failed to copy image to clipboard');
      setError('Failed to copy image to clipboard');
    }
  };

  const handleDownloadImage = async () => {
    const url = generateShareCardUrl();
    if (!url) {
      toast.error('Failed to generate share card');
      return;
    }

    let objectUrl: string | null = null;
    let downloadLink: HTMLAnchorElement | null = null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      objectUrl = window.URL.createObjectURL(blob);
      
      downloadLink = document.createElement('a');
      downloadLink.href = objectUrl;
      downloadLink.download = 'wita-analysis.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      toast.success('Image downloaded successfully!');
    } catch (err) {
      console.error('Failed to download image:', err);
      toast.error('Failed to download image');
      setError('Failed to download image');
    } finally {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
      if (downloadLink && downloadLink.parentNode) {
        downloadLink.parentNode.removeChild(downloadLink);
      }
    }
  };

  if (!isOpen) return null;

  const cardUrl = generateShareCardUrl();
  if (!cardUrl) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-red-600">Failed to generate share card</div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Share on X</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          {error ? (
            <div className="text-red-600 mb-4">{error}</div>
          ) : (
            <div className="relative">
              <img
                src={cardUrl}
                alt="Share card"
                className="w-full rounded-lg shadow-md"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setError('Failed to load image');
                  setIsLoading(false);
                }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCopyImage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Copy size={20} />
            Copy
          </button>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Download size={20} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}