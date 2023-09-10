import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If a connection is already established, return it
    console.log('DB already Open');
    return mongoose.connection;
  }

  try {
    // Connect to your MongoDB database
    const dbUrl = process.env.MONGODB_URI;
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return null; // Return null to indicate an error
  }
};

export default dbConnect;
