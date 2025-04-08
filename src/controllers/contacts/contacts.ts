import {Request, Response} from 'express'
import Contact from '../../models/contact'

export const addContact = async (req:Request, res:Response) => {
    const userId = (req as any).user.id
    const {name, phone, email} = req.body 

    await Contact.create({
        userId,
        name,
        phone,
        email
    })
    res.json({message:'Contact added successfully'})
}

export const listContacts = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;
   
    try {
        const contacts = await Contact.find({userId})
        res.json(contacts);
    } catch (error) {
        res.status(500).json({message:'Failed to fetch contact lists'})
    }
}

export const updateContact = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;
    const {id} = req.params;
    const {name, phone, email} = req.body;

   
    try {
        await Contact.findByIdAndUpdate({id, userId},{name,phone,email})
    res.json({message:'Contact updated successfully'})
    } catch (error) {
        res.status(500).json({message:'Failed to update contacts'})
    }
}

export const searchContacts = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;
    const query = req.query.query as string;

    
    try {
        const contacts = await Contact.find({
            userId,
            name:{$regex:query, $options:'i'}
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({message:'Failed to search contacts'})
    }
}

export const refreshContacts = async (req:Request, res:Response) => {
    const userId = (req as any).user.id 

    try {
        const refreshedContacts = await Contact.find({userId})
        .sort({updatedAt: -1})
        res.json({
            message:'Contacts refreshed successfully',
            contacts: refreshedContacts
        })
    } catch (error) {
        res.status(500).json({message:'Failed to refresh contacts'})
    }
}