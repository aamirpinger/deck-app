import { Constants } from '../../src/constants/constants';
import { DeckController } from '../../src/controllers/deck.controllers';

const mockDeck = {
  deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
  type: Constants.SHORT,
  shuffled: false,
  remaining: Constants.THIRTY_SIX,
};

describe('Create deck', () => {
  const deckController = new DeckController();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should create a new deck successfully!', () => {
    const functionNameMock = jest.fn().mockReturnValueOnce(mockDeck);
    const spy = jest
      .spyOn(DeckController.prototype as any, 'createDeck')
      .mockImplementation(functionNameMock);

    deckController.createDeck({
      type: Constants.SHORT,
      shuffled: false,
    });

    const spyCreatedDeck = spy.mock.results[0].value;
    expect(spyCreatedDeck).toMatchObject(mockDeck);
  });
});
