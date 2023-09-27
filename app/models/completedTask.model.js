import mongoose from "mongoose";

const completedTaskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["ontime", "late", "noDue"],
    required: true,
  },
});

export default mongoose.models.CompletedTask || mongoose.model("CompletedTask", completedTaskSchema);


