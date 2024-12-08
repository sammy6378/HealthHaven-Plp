

import { Doctor, Patient } from "../models/schema";
import {  resetEmail } from "../mailer/email"
import { Context } from "hono";
import { sign } from "hono/jwt";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// create new doctor

// get all Doctor
export const getdoctors = async ( )=>{
    return await Doctor.find()
}

// get doctor by id
export const getdoctor = async ( id:mongoose.Types.ObjectId)=>{
    return await Doctor.findById(id)
}

// create doctor
export const createdoctor = async (res:any)=>{
  const newDoctor = new Doctor(res)
    await newDoctor.save()
    return "doctor created successfully"
}

// delete doctor
export const deletedoctor = async (id:mongoose.Types.ObjectId):Promise<boolean>=>{
  const result = await Doctor.findByIdAndDelete(id);
  return !!result;
}

// update doctor
export const updatedoctor = async (id:mongoose.Types.ObjectId, res:any): Promise<string | undefined>=>{
  const updateDoctor = await Doctor.findByIdAndUpdate(id, res, { new: true });
     return updateDoctor ? "Admin updated successfully" : "doctor not found";
}



// Change password logic
export const changePassword = async (id: mongoose.Types.ObjectId,password: string,newPassword: string): Promise<{ error?: string; message?: string }> => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    return { error: "Admin not found" };
  }

  // Compare existing password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, doctor.password);

  if (!isPasswordCorrect) {
    return { error: "Incorrect password" };
  }

  // Hash the new password before updating
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  doctor.password = hashedNewPassword;
  await doctor.save();

  return { message: "Password changed successfully" };
};

// Toggle doctor status
export const toggleDoctor = async (id: mongoose.Types.ObjectId): Promise<string | undefined> => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    return "Doctor not found";
  }

  doctor.status = !doctor.status;
  await doctor.save();

  return "Doctor status toggled successfully";
};

// Forgot password logic
export const forgotPassword = async (c: Context) => {
  const { email } = await c.req.json();
  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  try {
    const user = await Patient.findOne({ email });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const secret = process.env.JWT_SECRET as string;
    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 180, // Token expires in 3 hours
    };

    const token = sign(payload, secret);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await resetEmail(email, resetUrl);

    return c.json({ message: 'Reset link sent. Please check your email.' }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};
