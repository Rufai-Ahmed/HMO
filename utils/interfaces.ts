import { Document } from "mongoose";

export interface iMember {
  firstName: string;
  middleName: string;
  lastName: string;
  relationship: string;
  email: string;
  avatar: string;
  avatarID: string;
  status: string;
  user: {};
  medicalHistory: Array<{}>;
}

export interface iUser {
  firstName: string;
  phoneNumber: string;
  location: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
  avatarID: string;
  token: string;
  verify: boolean;
  status: string;
  members: Array<{}>;
  medicalHistory: Array<{}>;
}

export interface iMedical {
  doctorName: string;
  hospitalName: string;
  cost: number;
  diagnosis: string;
  status: string;
  members: {};
}

export interface iMedicalData extends Document, iMedical {}
export interface iUserData extends Document, iUser {}
export interface iMemberData extends Document, iMember {}
