/**
 * Annotates an image with a banner showing the names of conversation participants
 * @param imageUrl The URL of the image to annotate
 * @param leftSideName The name to label on the left side
 * @param rightSideName The name to label on the right side
 * @returns A Promise that resolves to the annotated image as a base64 string
 */
export async function annotateImage(
  imageUrl: string,
  leftSideName: string,
  rightSideName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Load the image
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Enable CORS
      
      image.onload = () => {
        try {
          // Banner configuration
          const bannerHeight = 80;
          const padding = 20;
          
          // Set canvas dimensions to include banner
          canvas.width = image.width;
          canvas.height = image.height + bannerHeight;

          // Draw white banner background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, bannerHeight);

          // Configure banner text style
          ctx.font = 'bold 36px sans-serif';
          ctx.fillStyle = '#000000';
          ctx.textBaseline = 'middle';

          // Draw left side name
          ctx.textAlign = 'left';
          ctx.fillText(`${leftSideName} (left)`, padding, bannerHeight / 2);

          // Draw right side name
          ctx.textAlign = 'right';
          ctx.fillText(`${rightSideName} (right)`, canvas.width - padding, bannerHeight / 2);

          // Draw the original image below the banner
          ctx.drawImage(image, 0, bannerHeight);

          // Return the annotated image as base64
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          reject(new Error(`Failed to annotate image: ${err.message}`));
        }
      };

      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      image.src = imageUrl;
    } catch (err) {
      reject(new Error(`Failed to setup image annotation: ${err.message}`));
    }
  });
}