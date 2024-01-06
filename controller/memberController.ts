import { Request, Response } from "express";
import memberModel from "../model/memberModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { relationship, firstName } = req.body;

    const getUser = await userModel.findById(userID);

    if (getUser) {
      const member = await memberModel.create({
        firstName,
        status: "member",
        relationship,
      });

      getUser.members.push(new Types.ObjectId(member._id));
      getUser.save();

      return res.status(200).json({
        msg: "User created",
        data: member,
      });
    } else {
      return res.status(404).json({
        msg: "Error creating user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const viewMembers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const getUser = await userModel
      .findById(userID)
      .populate({ path: "members" });

    return res.status(200).json({
      msg: "User created",
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const loginMembers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, token } = req.body;

    const getUser = await userModel
      .findById(userID)
      .populate({ path: "members" });

    let getMember: any = getUser?.members.find(
      (el: any) => el.firstName === firstName
    );

    if (getMember && getUser?.token === token) {
      const encryptedData = jwt.sign(
        { id: getMember?._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        msg: "Welcoming a member in",
        data: encryptedData,
      });
    } else {
      return res.status(404).json({
        msg: "Access denied",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

//profile update
export const updateMemberNames = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { firstName, middleName, lastName } = req.body;

    const user = await memberModel.findById(memberID);

    if (user) {
      const updatedUser = await memberModel.findByIdAndUpdate(
        memberID,
        { firstName, middleName, lastName },
        { new: true }
      );

      return res.status(200).json({
        msg: "Verified user",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const updateMemberLocation = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { location } = req.body;

    const user = await memberModel.findById(memberID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        memberID,
        { location },
        { new: true }
      );

      return res.status(200).json({
        msg: "Verified user",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const updateMemberPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { phoneNumber } = req.body;

    const user = await memberModel.findById(memberID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        memberID,
        { phoneNumber },
        { new: true }
      );

      return res.status(200).json({
        msg: "Verified user",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

//profile avatar update
export const updateMemberAvatar = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;

    const user = await memberModel.findById(memberID);

    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file!.path
      );

      const updatedUser = await memberModel.findByIdAndUpdate(
        memberID,
        { avatar: secure_url, avatarID: public_id },
        { new: true }
      );

      return res.status(200).json({
        msg: "Verified user",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};
