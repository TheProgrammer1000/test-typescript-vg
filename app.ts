import express, {json} from 'express'

export const makeApp = () => {
  const app = express();
  app.use(json())

  app.get('/', (req, res) => {
    res.json({tja: "tjuuuu"})
  })

  app.post('/contact', (req, res) => {
  })

  app.get('/contact', (req, res) => {
    res.statusCode = 200
  })

  app.get('/contact/:id', (req, res) => {

  })


  return app
}

import express from 'express';

const app = express();


export const myApp = () => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.routes.get('contact', () => {

    }).post('contact', () => {});

    app.get('contact/:id', () => {

    })

    return app;
}
