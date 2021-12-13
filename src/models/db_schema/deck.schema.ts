import { Constants } from './../../constants/constants';
import { IDeck } from './../interfaces/deck.model';
import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

const DeckSchema: Schema = new Schema({
  deckId: {
    type: String,
    default: uuid,
  },
  type: {
    type: String,
    required: true,
    enum: [Constants.FULL, Constants.SHORT],
  },
  shuffled: {
    type: Boolean,
    required: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Cards' }],
});

export const Deck = mongoose.model<IDeck>('Deck', DeckSchema);
