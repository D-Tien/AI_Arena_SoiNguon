import { demoImageProvider } from './demoImageService';
import type { ImageGenerationProvider } from './ImageGenerationProvider';

export const IMAGE_GENERATION_MODE = 'demo';
export const imageGenerationProvider: ImageGenerationProvider = demoImageProvider;
