import dotenv from 'dotenv'
dotenv.config();
const PORT=process.env.PORT;
const MONGODB_URI=process.env.MONGODB_URI 
const JWT_SECRET = process.env.SECRET

export default {
    PORT,
    MONGODB_URI,
    JWT_SECRET
}