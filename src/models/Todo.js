import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
    },
    description: {
      type: String,
      required: 'Description is required',
    },
    file: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User Id is required',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', TodoSchema);
