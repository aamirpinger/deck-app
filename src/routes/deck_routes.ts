import express, { Request, Response } from 'express';
import { DeckController } from '../controllers/deck.controllers';
import { getErrorMessage } from '../utils/helper';

export const routes = express.Router();
routes.post('/create', async (req: Request, res: Response) => {
  try {
    const { type, shuffled } = req.body;
    const deck = await new DeckController().createDeck({
      type: type,
      shuffled: shuffled,
    });

    return res.send({ ...deck });
  } catch (e) {
    return res.status(400).send(getErrorMessage(e));
  }
});

routes.get('/open-the-deck', async (req: Request, res: Response) => {
  try {
    const { deckId } = req.body;
    const deckResponse = await new DeckController().openTheDeck(deckId);

    return res.send({ ...deckResponse });
  } catch (e) {
    return res.status(400).send(getErrorMessage(e));
  }
});

routes.post('/draw-card', async (req: Request, res: Response) => {
  try {
    const { deckId, count } = req.body;
    const cardsResponse = await new DeckController().drawCards(deckId, count);

    return res.send({ cards: cardsResponse });
  } catch (e) {
    return res.status(400).send(getErrorMessage(e));
  }
});
