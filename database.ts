import mongoose from "mongoose";

import {Contact} from './types/contactType'



const contactSchema = new mongoose.Schema<Contact>({
    firstname: String,
    lastname: String,
    email: String,
    personalnumber: String,
    address: String,
    zipCode: Number,
    city: String,
    country: String
});

const ContactModel = mongoose.model('contacts', contactSchema);

export const createContact = async(contactData: Contact) => {
  return await (new ContactModel(contactData)).save();
};

export const getContacts = async () => {
  return await ContactModel.find();
}

export const getProductById = async (id: string) => {
  return await ContactModel.findById(id);
}

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);