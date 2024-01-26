import Member from "../../models/Member.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SendActivationMail, SendWelcomeMail } from "../../utils/nodemailer.js";
import { uploadToCloudinary } from "../../utils/multer.js";
const { sign: JWT_SIGN } = jwt;
const { compare, hash, genSaltSync } = bcryptjs;
const SECRECT_KEY = "CCA";

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate(
      "packageInformation.packageId"
    );
    if (members) {
      res.status(200).json(members);
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const addMember = async (req, res) => {
  try {
    const {
      primaryContact,
      memberInformation,
      additionalInformation,
      billingInformation,
      packageInformation,
    } = req.body;

    const existingMember = await Member.findOne({
      "primaryContact.emailAddress": primaryContact.emailAddress,
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already in use" });
    }
    const salt = genSaltSync(10);
    const encryptpassword = await hash(primaryContact.password, salt);
    primaryContact.password = encryptpassword;

    const savedMember = await Member.create({
      primaryContact,
      memberInformation,
      additionalInformation,
      billingInformation,
      packageInformation,
    });
    if (savedMember) {
      SendWelcomeMail(
        savedMember.primaryContact.firstName,
        savedMember.primaryContact.emailAddress
      );
      res.status(201).json({ success: true, message: "Details Saved" });
    }
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const memberLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let member = await Member.findOne({
      "primaryContact.emailAddress": email,
    });
    if (member.status) {
      if (!member) {
        return res
          .status(404)
          .json({ success: false, message: "Member Not Found" });
      }

      let savedPassword = member.primaryContact.password;
      console.log();
      const PasswordCompare = await compare(password, savedPassword);
      if (!PasswordCompare) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect Password" });
      }
      let data = {
        member: {
          _id: member._id,
          name:
            member.primaryContact.firstName + member.primaryContact.lastName,
          email: member.primaryContact.emailAddress,
          isAdmin: false,
          isMember: true,
          isPremiumMember: member.packageInformation.paymentSuccess,
        },
      };

      const authtoken = JWT_SIGN(data, SECRECT_KEY);
      res.status(200).json({
        success: true,
        message: "Login Success",
        token: authtoken,
      });
    } else {
      res.status(401).json({ success: false, message: "You are Inactive" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await Member.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await compare(
      oldPassword,
      user.primaryContact.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }
    const salt = genSaltSync(10);
    const encryptNewPassword = await hash(newPassword, salt);

    user.primaryContact.password = encryptNewPassword;
    const updatedMember = await user.save();
    res.status(200).json({ success: true, message: "Password Changed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const memberProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await Member.findOne({ _id: userId })
      .select("-primaryContact.password")
      .populate("packageInformation.packageId");
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json({ error: "Member ID is required" });
    }

    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json({ error: "Member ID is required" });
    }

    // Find and delete the member by ID
    const deletedMember = await Member.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({
      message: "Member deleted successfully",
      deletedMemberId: deletedMember._id,
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const changeUserStatus = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.body.id,
      { status: req.body.value },
      { new: true }
    );

    if (updatedMember) {
      if (updatedMember.status === true) {
        console.log("active mail sent");
        SendActivationMail(
          updatedMember.primaryContact.firstName,
          updatedMember.primaryContact.emailAddress
        );
      }
      res.status(200).json({ success: true, data: updatedMember });
    } else {
      res.status(404).json({ success: false, error: "Member not found" });
    }
  } catch (error) {
    console.error("Error Updating status of member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logoUploader = async (req, res) => {
  try {
    if (req.file.path) {
      const filePath = req.file.path;
      const result = await uploadToCloudinary(filePath);
      if (result) {
        res.status(200).json({ success: true, filePath: result.url });
      }
    } else {
      res.status(404).json({ success: false, message: "path not found" });
    }
  } catch (error) {
    console.error("Error Uploading :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const renewPackage = async (req, res) => {
  try {
    const userId = req.userId;
    const extendDays = 30; // You can change this value as needed

    const member = await Member.findOne({ _id: userId });
    if (member) {
      const currentValidTillDate = member.packageInformation.validTillDate;
      const newValidTillDate = new Date(currentValidTillDate);
      newValidTillDate.setDate(newValidTillDate.getDate() + extendDays);

      await Member.findOneAndUpdate(
        { _id: userId },
        { $set: { "packageInformation.validTillDate": newValidTillDate } },
        { new: true }
      );
      res.status(200).json({
        message: "Package renewed successfully",
        newValidTillDate: newValidTillDate.toISOString(),
      });
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
