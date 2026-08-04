import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name'],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, 'A client name is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
      default: 'Planning',
    },
    totalArea: {
      type: Number, 
      // e.g., in sq. ft. or sq. meters - crucial for  later calculations
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model('Project', projectSchema);