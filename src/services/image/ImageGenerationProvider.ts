export interface ImageGenerationInput {
  prompt: string;
  garment?: string;
  style?: string;
  occasion?: string;
  color?: string;
  previousImageUrl?: string;
  signal?: AbortSignal;
}

export interface ImageGenerationResult {
  imageUrl: string;
  provider: 'demo' | 'api';
  matchedBy: string;
}

export interface ImageGenerationProvider {
  generate(input: ImageGenerationInput): Promise<ImageGenerationResult>;
}
