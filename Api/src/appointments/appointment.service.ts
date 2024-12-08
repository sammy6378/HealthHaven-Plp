
import { Appointment } from "../models/schema"
import mongoose from "mongoose"

// create new appointment

// get all Appointment
export const getAppointments = async ( )=>{
    return await Appointment.find()
}

// get appointment by id
export const getappointment = async ( id:mongoose.Types.ObjectId)=>{
    return await Appointment.findById(id)
}

// create appointment
export const createappointment = async (res:any)=>{
    const newAppointment = new Appointment(res);
    await newAppointment.save()
    
    return "appointment created successfully"
}

// delete appointment
export const deleteappointment = async (id:mongoose.Types.ObjectId):Promise<boolean>=>{
    const result = await Appointment.findByIdAndDelete(id);
    return !!result;
}

// update appointment
export const updateappointment = async (id:mongoose.Types.ObjectId, res:any): Promise<string | undefined>=>{
    const updateappointment = await Appointment.findByIdAndUpdate(id, res, { new: true });
    return updateappointment ? "appointment  updated successfully" : undefined;
}