import { ICards } from './../interfaces/cards.model';
import mongoose, { Schema } from 'mongoose';

const CardsSchema: Schema = new Schema({
  cards: {
    type: [
      {
        value: {
          type: String,
          required: true,
        },
        suit: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const Cards = mongoose.model<ICards>('Cards', CardsSchema);
