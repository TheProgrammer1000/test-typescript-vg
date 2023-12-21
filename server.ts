import mongoose from "mongoose";
import { makeApp, AppProps } from "./app";
import { createContact, getProductById } from './database';



let port = 8001;
const app = makeApp({createContact});

export const server = {};

mongoose.connect('mongodb://localhost:27017/contact').then(() => {
  app.listen(port, () => {
      console.log(`App listening to port ${port}`)
  })
})
.catch(err => {
  console.error('Failed to connect to MongoDB ', err);
})