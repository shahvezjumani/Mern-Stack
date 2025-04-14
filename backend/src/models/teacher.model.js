import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    assignmentCreated: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
