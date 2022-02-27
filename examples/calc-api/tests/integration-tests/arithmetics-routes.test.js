const express = require('express');
const arithmeticsRouter = require('./../../src/routers/arithmeticsRouter');
const request = require("supertest"); // supertest is a framework that allows to easily test web apis

const app = express();
app.use('/', arithmeticsRouter);

describe('testing arithmetic routes', () => {
  it('GET /add => 1 + 2 = 3', async () => {
    const { body } = await request(app).get('/add?a=1&b=2');

    expect(body).toEqual({ result: 3})
  })
  it('GET /sub => 3 - 2 = 1', async () => {
    const { body } = await request(app).get('/sub?a=3&b=2');

    expect(body).toEqual({ result: 1 })
  })
  it('GET /multiply => 2 * 2 = 4', async () => {
    const { body } = await request(app).get('/multiply?a=2&b=2');

    expect(body).toEqual({ result: 4 })
  })
  it('GET /divide => 5 / 2 = 2.5', async () => {
    const { body } = await request(app).get('/divide?a=5&b=2');

    expect(body).toEqual({ result: 2.5 })
  })
})
