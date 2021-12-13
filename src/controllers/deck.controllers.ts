import { CardResponse } from './../models/responses/card_response';
import { DeckResponse } from './../models/responses/deck_response';
import { ShortDeckCards } from '../constants/short_deck_cards';
import { FullDeckCards } from '../constants/full_deck_cards';
import { Cards } from './../models/db_schema/cards.schema';
import { IDeckInput } from './../models/interfaces/deck_input.model';
import { Deck } from '../models/db_schema/deck.schema';
import { Constants } from '../constants/constants';
import shuffleList from 'shuffle-array';
import validateUUID from 'uuid-validate';
import { Document, Types } from 'mongoose';
import { IDeck } from '../models/interfaces/deck.model';
import { ErrorConstants } from '../constants/error_constants';

export class DeckController {
  async createDeck({ type, shuffled }: IDeckInput): Promise<DeckResponse> {
    this.validateCreateDeckInput({ type, shuffled });

    try {
      const cardDeck = type.toUpperCase() === Constants.FULL ? FullDeckCards : ShortDeckCards;
      const newCards = new Cards({
        cards: shuffled ? shuffleList(cardDeck) : cardDeck,
      });

      const newDeck = new Deck({
        type,
        shuffled,
        cards: newCards,
      });

      const data = await Deck.create(newDeck);
      if (data) {
        await Cards.create(newCards);
      }

      return DeckResponse.from({ data, withCards: false, remaining: cardDeck.length });
    } catch (e) {
      throw new Error(ErrorConstants.UNABLE_CREATE_DECK);
    }
  }

  async openTheDeck(deckId: string): Promise<DeckResponse> {
    if (!deckId) {
      throw new Error(ErrorConstants.MISSING_PARAMS);
    }

    const result = await this.getDeck(deckId);

    return DeckResponse.from({ data: result, withCards: true });
  }

  async drawCards(deckId: string, count: number): Promise<CardResponse[]> {
    if (!deckId || !count) {
      throw new Error(ErrorConstants.MISSING_PARAMS);
    }

    const result = await this.getDeck(deckId);

    const removedItem = result.cards[0].cards.splice(0, count);
    await this.updateCardRecord(result);

    return removedItem.map(item => CardResponse.from(item));
  }

  validateCreateDeckInput({ type, shuffled }: IDeckInput) {
    let isError = false;
    if (
      !type ||
      shuffled === null ||
      ![Constants.FULL, Constants.SHORT].includes(type.toUpperCase())
    ) {
      isError = true;
    }

    if (isError) {
      throw new Error(ErrorConstants.INVALID_TYPE);
    }
  }

  async updateCardRecord(result: IDeck): Promise<void> {
    await Cards.updateOne({ _id: result.cards[0]._id }, { $set: { cards: result.cards[0].cards } });
  }

  async getDeck(deckId: string): Promise<
    Document<any, any, IDeck> &
      IDeck & {
        _id: Types.ObjectId;
      }
  > {
    if (!validateUUID(deckId)) {
      throw new Error(ErrorConstants.INVALID_UUID);
    }

    const result = await Deck.findOne({ deckId }).populate('cards').exec();
    if (!result) {
      throw new Error(ErrorConstants.NO_DECK_FOUND);
    }

    return result;
  }
}
