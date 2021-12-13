import { FullDeckCards } from './../../src/constants/full_deck_cards';
import { Constants } from '../../src/constants/constants';
import { DeckController } from '../../src/controllers/deck.controllers';
import { ErrorConstants } from '../../src/constants/error_constants';
import { Types } from 'mongoose';

const mockDeck = {
  deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
  type: Constants.FULL,
  shuffled: false,
  remaining: Constants.FIFTY_TWO,
  cards: [{ _id: new Types.ObjectId(), cards: FullDeckCards }],
};

describe('Open deck', () => {
  const deckController = new DeckController();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should open the deck!', () => {
    const functionNameMock = jest.fn().mockReturnValueOnce(mockDeck);
    const spy = jest
      .spyOn(DeckController.prototype as any, 'getDeck')
      .mockImplementation(functionNameMock);

    deckController.openTheDeck('36aad9e6-acda-4b5c-8c43-965a939cb5fb');

    const spyCreatedDeck = spy.mock.results[0].value;
    expect(spyCreatedDeck).toMatchObject(mockDeck);
    jest.clearAllMocks();
  });

  it("Should'nt open the deck! - Deck not found", async () => {
    try {
      const functionNameMock = jest
        .fn()
        .mockRejectedValueOnce(new Error(ErrorConstants.NO_DECK_FOUND));

      jest.spyOn(DeckController.prototype as any, 'getDeck').mockImplementation(functionNameMock);

      await deckController.openTheDeck('36aad9e6-acda-4b5c-8c43-965a939cb5fb');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(ErrorConstants.NO_DECK_FOUND);
      }
    } finally {
      jest.clearAllMocks();
    }
  });

  it("Should'nt open the deck! - Invalid UUID", async () => {
    try {
      await deckController.openTheDeck('123456');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(ErrorConstants.INVALID_UUID);
      }
    }
  });
});
