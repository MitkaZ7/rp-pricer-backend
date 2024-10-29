import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectToMongoDB = async () => {
    try {
       
        const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${process.env.MONGO_DB_NAME}?authSource=admin`;
        await mongoose.connect(uri);
        console.log('Успешное подключение к MongoDB');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
        throw error;
    }
};

export default connectToMongoDB;
