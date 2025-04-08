import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

}, {
    timestamps:true
})

contactSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Contact = mongoose.model('Contact',contactSchema)

export default Contact
