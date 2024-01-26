import Admin from "../../models/Admin.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign: JWT_SIGN } = jwt;
const { compare, hash, genSaltSync } = bcryptjs;

const SECRECT_KEY = "CCA";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAdminProfile = async (req, res) => {
  try {
    const profile = await Admin.findOne({ _id: req.adminId });
    if (profile) {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  let admin = await Admin.findOne({ email: email });
  if (!admin) {
    return res.status(404).json({ success: false, message: "Admin Not Found" });
  }
  const PasswordCompare = await compare(password, admin.password);
  if (!PasswordCompare) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect Password" });
  }
  let data = {
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
    },
  };

  const authtoken = JWT_SIGN(data, SECRECT_KEY);
  res.status(200).json({
    success: true,
    message: "Login Success",
    token: authtoken,
  });
};

export const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const oldAdmin = await Admin.findOne({ email: email });
    if (oldAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }

    // Hash the password
    const salt = genSaltSync(10);
    const encryptpassword = await hash(password, salt);

    const newAdmin = new Admin({ name, email, password: encryptpassword });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    res.status(200).json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // Verify the old password
    const isPasswordValid = await compare(oldPassword, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }

    // Hash the new password
    const salt = genSaltSync(10);
    const encryptNewPassword = await hash(newPassword, salt);

    // Update the admin's password
    admin.password = encryptNewPassword;

    // Save the updated admin
    const updatedAdmin = await admin.save();

    res.status(200).json({ success: true, message: "Password Changed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
