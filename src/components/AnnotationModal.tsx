import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenshot: { id: string; file: File; preview: string };
  onAnnotate: (id: string, annotatedImage: string) => void;
  onSkip: () => void;
  leftSideName: string;
  rightSideName: string;
}

export function AnnotationModal({
  isOpen,
  onClose,
  screenshot,
  onAnnotate,
  onSkip,
  leftSideName,
  rightSideName,
}: AnnotationModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);

  useEffect(() => {
    if (!isOpen || !screenshot || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = screenshot.preview;
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Set font style
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 4;

      // Draw left side name
      ctx.strokeText(leftSideName, 20, 40);
      ctx.fillText(leftSideName, 20, 40);

      // Draw right side name
      const rightNameWidth = ctx.measureText(rightSideName).width;
      ctx.strokeText(rightSideName, img.width - rightNameWidth - 20, 40);
      ctx.fillText(rightSideName, img.width - rightNameWidth - 20, 40);
    };
  }, [isOpen, screenshot, leftSideName, rightSideName]);

  const handleAnnotate = () => {
    if (!canvasRef.current) return;
    setIsAnnotating(true);
    
    try {
      const annotatedImage = canvasRef.current.toDataURL('image/png');
      onAnnotate(screenshot.id, annotatedImage);
    } catch (error) {
      console.error('Error annotating image:', error);
    } finally {
      setIsAnnotating(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Annotate Screenshot</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This will add names to your screenshot to help the AI understand who is who in the conversation.
            You can also skip this step if the names are already visible in the screenshots.
          </p>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <p className="font-medium mb-1">Left side:</p>
              <p className="text-blue-600">{leftSideName}</p>
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Right side:</p>
              <p className="text-blue-600">{rightSideName}</p>
            </div>
          </div>
        </div>

        <div className="overflow-auto max-h-[60vh] mb-6">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto mx-auto border border-gray-200 rounded"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Skip Annotation
          </button>
          <button
            onClick={handleAnnotate}
            disabled={isAnnotating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isAnnotating ? 'Annotating...' : 'Confirm Annotation'}
          </button>
        </div>
      </div>
    </div>
  );
}