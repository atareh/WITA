import { useState } from 'react';
import { Copy, Download, Share2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareableUrl: string;
  analysis: string;
}

export function ShareModal({ isOpen, onClose, shareableUrl, analysis }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(24);
    doc.text('WITA Analysis', 20, 20);
    
    // Add content
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(analysis, 170);
    doc.text(splitText, 20, 40);
    
    // Save the PDF
    doc.save('wita-analysis.pdf');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WITA Analysis',
          text: 'Check out this conversation analysis from WITA!',
          url: shareableUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Share Analysis</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <input
              type="text"
              value={shareableUrl}
              readOnly
              className="flex-1 bg-transparent outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="text-blue-600 hover:text-blue-700 p-2"
            >
              <Copy size={20} />
            </button>
          </div>
          {copied && (
            <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            <Share2 size={20} />
            Share
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}