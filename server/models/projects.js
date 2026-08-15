import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A project must have a name"],
      trim: true,
    },
    clientName: {
      type: String,
      trim: true,
      default: "Unknown Client",
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Planning",
    },
    totalArea: {
      type: Number,
    },

    formData: {
      type: mongoose.Schema.Types.Mixed,
    },
    floors: {
      type: mongoose.Schema.Types.Mixed,
    },
    detailedRooms: {
      type: mongoose.Schema.Types.Mixed,
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true, 
  },
);

export default mongoose.model("Project", projectSchema);
