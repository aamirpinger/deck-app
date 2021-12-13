import { ICard } from './../interfaces/card.model';

export class CardResponse {
  constructor(public value: string, public suit: string, public code: string) {}

  public static from(input: ICard): CardResponse {
    return new this(input.value, input.suit, input.code);
  }
}
