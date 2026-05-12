import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export type QRStyle = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareStyle = 'dots' | 'square' | 'extra-rounded';
export type CornerDotStyle = 'dots' | 'square';

export interface SavedQR {
  id: string;
  userId: string;
  name: string;
  data: string;
  config: any;
  scans: number;
  createdAt: any;
}

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
  
  savedQRs: SavedQR[];
  
  // Actions
  setData: (data: string) => void;
  setImage: (image: string | null) => void;
  setOptions: (options: Partial<QRState>) => void;
  saveQR: (userId: string, name: string) => Promise<void>;
  fetchSavedQRs: (userId: string) => () => void;
  deleteQR: (id: string) => Promise<void>;
  incrementScans: (id: string) => Promise<void>;
}

export const useQRStore = create<QRState>((set, get) => ({
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
  
  savedQRs: [],

  setData: (data) => set({ data }),
  setImage: (image) => set({ image }),
  setOptions: (options) => set((state) => ({ ...state, ...options })),

  saveQR: async (userId, name) => {
    const state = get();
    const config = {
      dotsColor: state.dotsColor,
      dotsType: state.dotsType,
      cornersSquareColor: state.cornersSquareColor,
      cornersSquareType: state.cornersSquareType,
      cornersDotColor: state.cornersDotColor,
      cornersDotType: state.cornersDotType,
      backgroundColor: state.backgroundColor,
      image: state.image,
    };

    await addDoc(collection(db, 'qr_codes'), {
      userId,
      name,
      data: state.data,
      config,
      scans: 0,
      createdAt: serverTimestamp(),
    });
  },

  fetchSavedQRs: (userId) => {
    const q = query(collection(db, 'qr_codes'), where('userId', '==', userId));
    return onSnapshot(q, (snapshot) => {
      const qrs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedQR));
      set({ savedQRs: qrs });
    });
  },

  deleteQR: async (id) => {
    await deleteDoc(doc(db, 'qr_codes', id));
  },

  incrementScans: async (id) => {
    const qr = get().savedQRs.find(q => q.id === id);
    if (qr) {
      await updateDoc(doc(db, 'qr_codes', id), {
        scans: (qr.scans || 0) + 1
      });
    }
  }
}));
