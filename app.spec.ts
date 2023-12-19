import {default as request} from 'supertest'
import { makeApp } from "./app";

const app = makeApp();

describe('GET /contact', () => {
    it('should get all contacts and getting coordinates of that contact', () => {

    })
})

describe('GET /contact:id', () => {
    it('should return statusCode 200 on valid contactID', () => {

    })

    it('should return statusCode 404 on invalid contactID', () => {

    })
})

describe('POST /contact', () => {
    it('should have all fields with required types', () => {

    })

    it('should return statusCode 201 when valid', () => {

    })
    it('should return statusCode 400 when invalid', () => {

    })
})
