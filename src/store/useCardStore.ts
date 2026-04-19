import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Card {
  id: string;
  name: string;
  set: string;
  have: boolean;
  jp: boolean;
  foil: boolean;
  signed: boolean;
  altered: boolean;
  createdAt: number;
}

export type PimpLevel = 'NORMAL' | 'PIMP' | 'PIMP MAX';

export const SCORE_VALUES = {
  have: 1,
  jp: 2,
  foil: 1,
  signed: 2,
  altered: 1,
};

export const calculateScore = (card: Card): number => {
  let score = 0;
  if (card.have) score += SCORE_VALUES.have;
  if (card.jp) score += SCORE_VALUES.jp;
  if (card.foil) score += SCORE_VALUES.foil;
  if (card.signed) score += SCORE_VALUES.signed;
  if (card.altered) score += SCORE_VALUES.altered;
  return score;
};

export const getPimpLabel = (card: Card): PimpLevel => {
  // PIMP MAX: have=true, jp=true, signed=true
  if (card.have && card.jp && card.signed) {
    return 'PIMP MAX';
  }
  const score = calculateScore(card);
  if (score >= 4) return 'PIMP';
  return 'NORMAL';
};

interface CardState {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'createdAt'>) => void;
  updateCard: (id: string, updates: Partial<Omit<Card, 'id'>>) => void;
  removeCard: (id: string) => void;
  getStats: () => {
    total: number;
    owned: number;
    completion: number;
    jpCount: number;
    foilCount: number;
    signedCount: number;
    pimpRatio: number;
    topCards: Card[];
  };
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],
      addCard: (cardData) => {
        const newCard: Card = {
          ...cardData,
          id: uuidv4(),
          createdAt: Date.now(),
        };
        set((state) => ({ cards: [newCard, ...state.cards] }));
      },
      updateCard: (id, updates) => {
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },
      removeCard: (id) => {
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id),
        }));
      },
      getStats: () => {
        const { cards } = get();
        const total = cards.length;
        if (total === 0) {
          return {
            total: 0,
            owned: 0,
            completion: 0,
            jpCount: 0,
            foilCount: 0,
            signedCount: 0,
            pimpRatio: 0,
            topCards: [],
          };
        }

        const owned = cards.filter((c) => c.have).length;
        const jpCount = cards.filter((c) => c.jp).length;
        const foilCount = cards.filter((c) => c.foil).length;
        const signedCount = cards.filter((c) => c.signed).length;
        
        const pimpCount = cards.filter((c) => getPimpLabel(c) !== 'NORMAL').length;
        
        const sortedByScore = [...cards].sort((a, b) => calculateScore(b) - calculateScore(a));

        return {
          total,
          owned,
          completion: Math.round((owned / total) * 100),
          jpCount,
          foilCount,
          signedCount,
          pimpRatio: Math.round((pimpCount / total) * 100),
          topCards: sortedByScore.slice(0, 5),
        };
      },
    }),
    {
      name: 'mtg-pimp-collection',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
