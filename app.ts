import express, {json} from 'express';
import {Contact} from './types/contactType'
import { isValidId, getProductById, getContacts } from './database';
import axios from 'axios';


const app = express();

export type AppProps = {
  createContact: (contact: Contact) => any
}

const validateEmail = (email: string): boolean => {
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');

  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

const validateZIPCode = (zipCode: string): boolean => {
  const pattern: RegExp = /^\d{5}(?:-\d{4})?$/;

  return pattern.test(zipCode);
}

const validatePersonalNumber = (personalNumber: string): boolean => {
  // Define the regular expression pattern for a generic personal number validation
  // Adjust the pattern based on the specific format and rules for your case
  const pattern: RegExp = /^[0-9]{10}$/;

  // Use test() method to check if the personal number matches the pattern
  return pattern.test(personalNumber);
}

const validateText = (text: string): boolean => {
  // Define the regular expression pattern for text validation (letters and spaces)
  const pattern: RegExp = /^[a-zA-Z\s]+$/;

  // Use test() method to check if the text matches the pattern
  return pattern.test(text);
}


export const makeApp = ({createContact}: AppProps) => {
    app.use(json())

    app.get('/', (req: any, res: any) => {
        res.send('Hello World');
    });

    app.get('/contact', async (req: any, res: any) => {
      //const contacts = await getContacts();


      const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=London&country=England&X-Api-Key=ejAVemc7TNnbVZ7xtflf7w==oevEsgdbvxvMKUTR`)

      console.log('response: ', response)

      res.send('tjaa!')


    })

    app.post('/contact', async (req: any, res: any) => {
      let errors = [];


      console.log('req.body: ', req.body)

      const email: string = req.body.email
      const personalNumber = req.body.personalnumber
      const zipcode = req.body.zipCode


      const isZipCode: boolean = validateZIPCode(zipcode)
      const isPersonalNumber: boolean = validatePersonalNumber(personalNumber)
      const isEmail: boolean = validateEmail(email)

      
      if(!isPersonalNumber) {
        errors.push({
          "error": "personalNumber is not valid"
        })
        return res.status(400).json(errors)
      }

      if(!isEmail) {
        errors.push({
          "error": "Email is not valid"
        })
        return res.status(400).json(errors)
      }
     
      if(!isZipCode) {
        errors.push({
          "error": "zipcode is not valid"
        })
        console.log('HÄÄR blev fel isZipCode')

        return res.status(400).json(errors)
      }

      const contact = await createContact(req.body);
      console.log('contact: ', contact);


      res.status(201).json(contact)
    });


    app.get('/contact/:id', async (req, res) => {
      console.log('req.params.id: ', req.params.id)
       //res.status(200)
      // if (!isValidId(req.params.id)) {
      //   res.status(400).send();
      // } else {
     const product = await getProductById(req.params.id);
     console.log('product: ', product)
     res.status(200).json(product);
      // }
    });

    return app;
}
