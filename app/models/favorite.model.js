import mongoose from "mongoose";


const favSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference the User model
    ref: "User", // Reference the User model
    required: true,
  },
  favorites: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['project', 'label', 'filter'],
        required: true,
      },
    },
  ],
});


export default mongoose.models.Favorite || mongoose.model('Favorite',favSchema)