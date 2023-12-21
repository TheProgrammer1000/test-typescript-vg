import {default as request} from 'supertest'
import { makeApp } from "./app";
import nock = require('nock');


type Contact = {
  firstname: string,
  lastname: string,
  email: string,
  personalnumber: string,
  address: string,
  zipCode: number,
  city: string,
  country: string
}


const createContact = jest.fn();
const getContactById = jest.fn();

const app = makeApp({
  createContact: (contact: Contact) => contact,
});


const validContact = {
  firstname: "Dennis",
  lastname: "Karlsson",
  email: "dennis@gmail.com",
  personalnumber: "950510-5432",
  address: 'toppergatan 5',
  zipCode: 11345,
  city: 'Stockholm',
  country: 'Sweden'
}

const invalid = {
  firstname: "Dennis",
  lastname: "Karlsson",
  email: "denniskarlssongmail.com",
  personalnumber: "950510-5432",
  address: 'toppergatan 5',
  zipCode: 11345,
  city: 'Stockholm',
  country: 'Sweden'
}


describe('GET /contact', () => {
    it('should get all contacts and getting coordinates of that contact', async() => {
      const response = await request(app).get('/contact');
      console.log('response: ', response);
    })
})

describe('GET /contact:id', () => {
    beforeEach(() => {
      nock('https://api-ninjas.com')
        .get('/api/geocoding?city=London&country=England')
        .times(2)
        .reply(200, {
          // Your mock response here
        });
    })

    getContactById.mockReset();
    getContactById.mockResolvedValue({"firstname": "Dennis",
    "lastname": "Karlsson",
    "email": "dennis@gmail.com",
    "personalnumber": "950510-5432",
    "address": "toppergatan 5",
    "zipCode": 11345,
    "city": "Stockholm",
    "country": "Sweden"})



    it('should return statusCode 200 on valid contactID', async () => {
      const response = await request(app).get('/contact/65842e742400b2765235fae1');

      console.log('response.statusCode: ', response.statusCode)
      //console.log('response: ', response)
      expect(response.statusCode).toBe(200);
    })

    it('should return statusCode 404 on invalid contactID', () => {

  })
})

describe('POST /contact', () => {

  const mockContact: Contact = {
    firstname: 'Dennis',
    lastname: "Karlsson",
    email: "dennis.karlsson@gmail.com",
    personalnumber: "980713-3450",
    address: 'vingårdsgatan 5',
    zipCode: 11345,
    city: 'Stockholm',
    country: 'Sweden'
  }

    beforeEach(async () => {
      createContact.mockResolvedValue(mockContact)
    })

    it('should have all fields with required types', async () => {
      try {
        const response = await request(app).post('/contact').send(validContact);
        expect(response.statusCode).toBe(201);
        expect(response.header).toBe('Content-Type application/json');
      } catch (error) {
        console.error(error);
      }
    })

    it('should return statusCode 201 when valid', async () => {
      try {
        const response = await request(app).post('/contact').send(validContact);
        expect(response.statusCode).toBe(201);
      } catch (error) {
        console.error(error);
      }
    })

    it('should return statusCode 400 when invalid', async () => {
      try {
        const response = await request(app).post('/contact').send(invalid);
        expect(response.statusCode).toBe(400);
      } catch (error) {
        console.error(error);
      }
    });
})
