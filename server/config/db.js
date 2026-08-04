import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    // Connect to the BuildCalc Pro database using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Logs the specific Atlas cluster host to confirm success
    console.log(`MongoDB Connected: ${conn.connection.host}`); 
    
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;
