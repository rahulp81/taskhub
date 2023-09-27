import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference the User model
    ref: "User", // Reference the User model
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  due: {
    type: Date,
    required: false,
  },
  labels: {
    type: [String],
    required: false,
  },
  project: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
