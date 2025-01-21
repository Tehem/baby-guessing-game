/**
 * Loads an image based on its type and source
 * @param image The image configuration object
 * @returns The complete image source path
 */
export function getImageSource(image: { type: 'url' | 'local'; source: string }): string {
  if (image.type === 'url') {
    return image.source;
  }
  
  // For local images, we assume they are stored in the public/images directory
  return `/images/${image.source}`;
}