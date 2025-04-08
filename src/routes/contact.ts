import {Router} from 'express'
import { addContact, listContacts, refreshContacts, searchContacts, updateContact } from '../controllers/contacts/contacts'
const contactRouter = Router()

contactRouter.post('/', addContact);
contactRouter.get('/',listContacts);
contactRouter.get('/search',searchContacts);
contactRouter.put('/:id',updateContact);
contactRouter.get('/refresh', refreshContacts)

export default contactRouter