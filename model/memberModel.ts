import { Schema, Types, model } from "mongoose";
import { iMemberData } from "../utils/interfaces";

const memberModel = new Schema<iMemberData>(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    relationship: { type: String },
    email: { type: String, unique: true },
    avatar: { type: String },
    avatarID: { type: String },
    status: { type: String },
    user: { type: Types.ObjectId, ref: "members" },
    medicalHistory: [{ type: Types.ObjectId, ref: "medicalHistories" }],
  },
  { timestamps: true }
);

export default model<iMemberData>("members", memberModel);
