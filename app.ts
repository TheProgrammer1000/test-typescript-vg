import express from 'express';

const app = express();


export const makeApp = () => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/contact', (req, res) => {
      res.status(200).send('yk')
    })

    app.post('/contact', (req, res) => {

    });

    return app;
}
