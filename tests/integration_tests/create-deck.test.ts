import 'dotenv/config.js';

import request from 'supertest';
import { Application } from 'express';
import mongoose from 'mongoose';
import { configServer } from './../../src/server';
import { ErrorConstants } from '../../src/constants/error_constants';
import { Constants } from '../../src/constants/constants';
import validateUUID from 'uuid-validate';

let server: Application;
const endpoint = '/create';

beforeAll(async () => {
  const { MONGO_URL } = process.env;
  server = configServer(`${MONGO_URL}test_db`);
});

afterAll(done => {
  mongoose.connection.close(() => done());
});

describe(`POST ${endpoint}`, () => {
  it('should return 400 & "Invalid Type" as a response when "type" is not provided in request', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        shuffled: false,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.INVALID_TYPE);
        done();
      });
  });

  it('should return 400 & "Unable to create deck" as a response when "shuffled" is not provided in request', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        type: Constants.SHORT,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual(ErrorConstants.UNABLE_CREATE_DECK);
        done();
      });
  });

  it('should return 200 & valid response if input parameters are valid', (done): void => {
    request(server)
      .post(endpoint)
      .send({
        shuffled: false,
        type: Constants.SHORT,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(validateUUID(res.body.deckId)).toBeTruthy();
        expect(res.body.type).toEqual(Constants.SHORT);
        expect(res.body.shuffled).toBeFalsy();
        expect(res.body.remaining).toEqual(Constants.THIRTY_SIX);
        done();
      });
  });
});
