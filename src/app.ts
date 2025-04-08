import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose'
import logger from './utils/logger';
import config from './utils/config';
import middleware from './utils/middleware';
import authRouter from './routes/auth';
import contactRouter from './routes/contact';
import profileRouter from './routes/profile';
import authenticationToken from './utils/authenticationToken';

mongoose.set('strictQuery',false)

// logger.info('connecting to ', config.MONGODB_URI!)

mongoose.connect(config.MONGODB_URI!)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
})

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/auth", authRouter)
app.use('/api/contact', authenticationToken,contactRouter)
app.use('/api/user',authenticationToken,profileRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler as any)

export default app
