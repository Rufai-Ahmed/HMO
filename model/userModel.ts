import { Schema, Types, model } from "mongoose";
import { iUserData } from "../utils/interfaces";

const userModel = new Schema<iUserData>(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    avatar: { type: String },
    avatarID: { type: String },
    token: { type: String },
    verify: { type: Boolean, default: false },
    status: { type: String },
    members: [{ type: Types.ObjectId, ref: "members" }],
    medicalHistory: [{ type: Types.ObjectId, ref: "medicalHistories" }],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
