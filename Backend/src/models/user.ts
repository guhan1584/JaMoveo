import { Schema, model } from "mongoose";
import { ALLOWED_INSTRUMENTS } from "../constants/instruments";

interface IUser {
  username: string;
  password: string;
  instrument: string;
  admin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    instrument: {
      type: String,
      required: true,
      enum: ALLOWED_INSTRUMENTS,
      message: "Invalid instrument",
    },
    admin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
