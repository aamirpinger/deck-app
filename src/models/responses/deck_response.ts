import { CardResponse } from './card_response';
import { ICard } from './../interfaces/card.model';
import { IDeck } from './../interfaces/deck.model';
import { Document } from 'mongoose';

export class DeckResponse {
  constructor(
    public deckId: string,
    public type: string,
    public shuffled: boolean,
    public remaining: Number,
    public cards?: ICard[]
  ) {}

  public static from(input: {
    data: Document<any, any, IDeck>;
    withCards: boolean;
    remaining?: Number;
  }): DeckResponse {
    const response = new this(
      input.data.get('deckId'),
      input.data.get('type'),
      input.data.get('shuffled'),
      input.remaining != null ? input.remaining : input.data.get('cards')[0]?.cards.length
    );

    if (input.withCards) {
      response.cards = input.data
        .get('cards')[0]
        .cards.map((card: ICard) => CardResponse.from(card));
    }

    return response;
  }
}
