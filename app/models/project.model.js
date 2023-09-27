import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference the User model
    ref: "User", // Reference the User model
    required: true,
  },
  projects: {
    type: [String], // Define the field as an array of strings directly
    required: false,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
