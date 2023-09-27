import mongoose from "mongoose";


const favSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference the User model
      ref: "User", // Reference the User model
      required: true,
    },
    name: {
      type: [String], // Define the field as an array of strings directly
      required: true,
    },
    type: {
      type : String,
      enum : ['project', 'label', 'filter'],
      required : true,
    }
  });


export default mongoose.models.Favorite || mongoose.model('Favorite',favSchema)