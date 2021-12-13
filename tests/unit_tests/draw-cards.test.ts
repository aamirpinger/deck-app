import { ErrorConstants } from './../../src/constants/error_constants';
import { ShortDeckCards } from './../../src/constants/short_deck_cards';
import { Constants } from '../../src/constants/constants';
import { DeckController } from '../../src/controllers/deck.controllers';
import { Types } from 'mongoose';

const mockDeck = {
  deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
  type: Constants.SHORT,
  shuffled: false,
  remaining: Constants.THIRTY_SIX,
  cards: [{ _id: new Types.ObjectId(), cards: ShortDeckCards }],
};

describe('Draw cards', () => {
  const deckController = new DeckController();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should draw the cards!', async () => {
    const functionNameMock = jest.fn().mockReturnValueOnce(mockDeck);
    jest.spyOn(DeckController.prototype as any, 'getDeck').mockImplementation(functionNameMock);
    jest.spyOn(DeckController.prototype as any, 'updateCardRecord').mockImplementation(jest.fn());
    const expectedResponse = mockDeck.cards[0].cards[0];

    const deckResponse = await deckController.drawCards('36aad9e6-acda-4b5c-8c43-965a939cb5fb', 1);

    expect(deckResponse).toMatchObject([expectedResponse]);
  });

  it("Should'nt draw the cards! - DeckId not found", async () => {
    try {
      const functionNameMock = jest
        .fn()
        .mockRejectedValueOnce(new Error(ErrorConstants.NO_DECK_FOUND));
      jest.spyOn(DeckController.prototype as any, 'getDeck').mockImplementation(functionNameMock);

      await deckController.drawCards('36aad9e6-acda-4b5c-8c43-965a939cb511', 1);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(ErrorConstants.NO_DECK_FOUND);
      }
    }
  });

  it("Should'nt draw the cards! - invalid DeckId", async () => {
    try {
      await deckController.drawCards('123', 1);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(ErrorConstants.INVALID_UUID);
      }
    }
  });
});
