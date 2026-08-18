import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//THE BLUEPRINT (Schema Definition)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // Prevents password from being returned in standard queries
    },
    role: {
      type: String,
      enum: ["user", "admin"], // This restricts the role to only these two words
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

//SECURITY LAYER (Pre-save Middleware)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//COMPARING  METHODS (Instance Methods)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
