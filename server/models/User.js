import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    timezone: { type: String, default: "UTC" },
    // For each date, store an array of slot objects { start, end }
    availability: {
      type: Map,
      of: [
        {
          start: { type: String },
          end: { type: String },
        },
      ],
      default: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
