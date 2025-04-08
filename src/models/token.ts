import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type: Date,
        required:true
    }
})

tokenSchema.index({expiresAt:1},{expireAfterSeconds:0})
const Token = mongoose.model('Token',tokenSchema)
export default Token