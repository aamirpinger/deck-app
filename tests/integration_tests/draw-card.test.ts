import 'dotenv/config.js';

import request from 'supertest';
import { Application } from 'express';
import mongoose from 'mongoose';
import { configServer } from './../../src/server';
import { ErrorConstants } from '../../src/constants/error_constants';
import { Constants } from '../../src/constants/constants';
import { DeckController } from '../../src/controllers/deck.controllers';
import { DeckResponse } from '../../src/models/responses/deck_response';
import { FullDeckCards } from '../../src/constants/full_deck_cards';

let server: Application;
let fullDeckData: DeckResponse;
const unshuffledDeckFirstCard = FullDeckCards[0];
const endpoint = '/draw-card';

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

describe(`POST ${endpoint}`, () => {
  it('should return 400 & "Missing Parameters" as a response when NO parameters are provided in the request', (done): void => {
    request(server)
      .post(endpoint)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.MISSING_PARAMS);
        done();
      });
  });

  it('should return 400 & "Missing Parameters" as a response when "deckId" is not provided in request', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        count: 1,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.MISSING_PARAMS);
        done();
      });
  });

  it('should return 400 & "Missing Parameters" as a response when "count" is not provided in request', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.MISSING_PARAMS);
        done();
      });
  });

  it('should return 400 & No Deck Found. as a response when "count" is not provided in request', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        deckId: '36aad9e6-acda-4b5c-8c43-965a939cb5fb',
        count: 1,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.NO_DECK_FOUND);
        done();
      });
  });

  it('should return 200 & valid response if deckID is valid and count value is also provided', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        deckId: fullDeckData.deckId,
        count: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.cards[0]).toMatchObject(unshuffledDeckFirstCard);
        done();
      });
  });
});
