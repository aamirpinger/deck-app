import 'dotenv/config.js';

import request from 'supertest';
import { Application } from 'express';
import mongoose from 'mongoose';
import { configServer } from './../../src/server';
import { ErrorConstants } from '../../src/constants/error_constants';
import { Constants } from '../../src/constants/constants';
import { DeckController } from '../../src/controllers/deck.controllers';
import { DeckResponse } from '../../src/models/responses/deck_response';

let server: Application;
let fullDeckData: DeckResponse;
const endpoint = '/open-the-deck';

beforeAll(async () => {
  const { MONGO_URL } = process.env;
  server = configServer(`${MONGO_URL}test_db`);
  fullDeckData = await new DeckController().createDeck({
    type: Constants.FULL,
    shuffled: false,
  });
});

afterAll(done => {
  mongoose.connection.close(() => done());
});

describe(`GET ${endpoint}`, () => {
  it('should return 400 & "Invalid UUID" as a response when Deck ID is invalid', (done): void => {
    request(server)
      .get(endpoint)
      .send({
        deckId: '36aad9e6-acda-4b5c-8c43',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.INVALID_UUID);
        done();
      });
  });
  `/open-the-deck`;
  it('should return 400 & "Missing parameters" as a response when Deck ID is not provided', (done): void => {
    request(server)
      .get(endpoint)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.MISSING_PARAMS);
        done();
      });
  });
  `/open-the-deck`;
  it('should return 400 & "No Deck Found" as a response when Deck ID is not found in the DB', (done): void => {
    request(server)
      .get(endpoint)
      .send({
        deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.NO_DECK_FOUND);
        done();
      });
  });
  `/open-the-deck`;
  it('should return 200 & valid response if deckID is valid', (done): void => {
    request(server)
      .get(endpoint)
      .send({
        deckId: fullDeckData.deckId,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.deckId).toEqual(fullDeckData.deckId);
        expect(res.body.remaining).toEqual(Constants.FIFTY_TWO);
        expect(res.body.cards.length).toEqual(Constants.FIFTY_TWO);
        done();
      });
  });
});
