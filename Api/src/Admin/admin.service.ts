

import { Admin } from "../models/schema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// get all admin
export const getAdmins = async ( )=>{
    return await Admin.find().select('-password');
}

// get admin by id
export const getadmin = async ( id:mongoose.Types.ObjectId)=>{
    return await Admin.findById(id).select('-password');
}

// create admin
export const createadmin = async (res:any)=>{
  const newAdmin = new Admin(res);
  await newAdmin.save();
  return "admin created successfully"
}

// delete admin
export const deleteadmin = async (id:mongoose.Types.ObjectId):Promise<boolean>=>{
  const result = await Admin.findByIdAndDelete(id);
  return !!result;
}

// update admin
export const updateadmin = async (id:mongoose.Types.ObjectId, res:any): Promise<string | undefined>=>{
  const updateAdmin = await Admin.findByIdAndUpdate(id, res, { new: true });
    return updateAdmin ? "Admin updated successfully" : undefined;
}



// Change password logic
// Change password logic
export const changePassword = async (
  id: mongoose.Types.ObjectId,
  password: string,
  newPassword: string
): Promise<{ error?: string; message?: string }> => {
  const admin = await Admin.findById(id);

  if (!admin) {
    return { error: "Admin not found" };
  }

  // Compare existing password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    return { error: "Incorrect password" };
  }

  // Hash the new password before updating
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNewPassword;
  await admin.save();

  return { message: "Password changed successfully" };
};