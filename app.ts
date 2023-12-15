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