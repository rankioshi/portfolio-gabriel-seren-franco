import { create } from 'zustand';

export type QRStyle = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareStyle = 'dots' | 'square' | 'extra-rounded';
export type CornerDotStyle = 'dots' | 'square';

interface QRState {
  data: string;
  width: number;
  height: number;
  margin: number;
  dotsColor: string;
  dotsType: QRStyle;
  cornersSquareColor: string;
  cornersSquareType: CornerSquareStyle;
  cornersDotColor: string;
  cornersDotType: CornerDotStyle;
  backgroundAlpha: number;
  backgroundColor: string;
  image: string | null;
  imageSize: number;
  imageMargin: number;
  
  // Actions
  setData: (data: string) => void;
  setImage: (image: string | null) => void;
  setOptions: (options: Partial<QRState>) => void;
}

export const useQRStore = create<QRState>((set) => ({
  data: 'https://qr-code-styling.com',
  width: 300,
  height: 300,
  margin: 10,
  dotsColor: '#4267b2',
  dotsType: 'rounded',
  cornersSquareColor: '#4267b2',
  cornersSquareType: 'extra-rounded',
  cornersDotColor: '#4267b2',
  cornersDotType: 'dots',
  backgroundAlpha: 1,
  backgroundColor: '#ffffff',
  image: null,
  imageSize: 0.4,
  imageMargin: 0,

  setData: (data) => set({ data }),
  setImage: (image) => set({ image }),
  setOptions: (options) => set((state) => ({ ...state, ...options })),
}));
