import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  tags: [{
    type: String,
    required: false,
  }],
});

export default mongoose.models.Tags || mongoose.model('Tags', tagsSchema);
