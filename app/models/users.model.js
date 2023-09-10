import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
