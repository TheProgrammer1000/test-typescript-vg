import nock from 'nock';
import {default as request} from 'supertest';
import { makeApp } from './app';

const app = makeApp();

describe('check test', () => {
  it('should return true testing', async () => {

    const response = await request(app).get('/contact')
    console.log('response', response)
    expect(response.statusCode).toBe(200)
  })
})
