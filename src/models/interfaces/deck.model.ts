import { ICard } from './card.model';

export interface IDeck {
  deckId: string;
  type: string;
  shuffled: boolean;
  cards: { _id: string; cards: ICard[] }[];
  remaining?: number;
}
