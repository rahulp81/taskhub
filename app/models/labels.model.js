import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference the User model
    ref: "User", // Reference the User model
    required: true,
  },
  tags: {
    type: [String], // Define the field as an array of strings directly
    required: false,
  },
});

export default mongoose.models.Tags || mongoose.model('Tags', tagsSchema);
