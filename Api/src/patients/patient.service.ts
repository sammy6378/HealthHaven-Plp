
// import { eq } from "drizzle-orm"
// import db from "../db/connect"
// import { Patient } from '../models/schema'


// // get all Patient
// export const getPatient = async ( )=>{
//     return await Patient.find()
// }

// // get patient by id
// export const getpatient = async ( id:number)=>{
//     return await db.query.Patient.findFirst({
//     where:eq(Patient.patient_id,id)
// })
// }

// // create patient
// export const createPatient = async (res:any)=>{
//     await db.insert(Patient).values(res)
//     return "Patient created successfully"
// }

// // delete patient
// export const deletePatient = async (id:number):Promise<boolean>=>{
//     await db.delete(Patient).where(eq(Patient.patient_id,id))
//     return true
// }

// // update patient
// export const updatePatient = async (id:number, res:any): Promise<string | undefined>=>{
//     await db.update(Patient).set(res).where(eq(Patient.patient_id,id))
//     return "patient updated successfully"
// }

// // toggle status from true to false
// export const toggleStatus = async (id: number): Promise<string> => {
//     const patient = await getpatient(id); // Fetch the patient by ID
//     if (!patient) return "Patient not found";

//     // Toggle the patient's status
//     const newStatus = !patient.status;
//     await db.update(Patient)
//         .set({ status: newStatus })
//         .where(eq(Patient.patient_id, id));

//     return "Status toggled successfully";
// };

import mongoose from "mongoose";
import { Patient } from '../models/schema';

// Get all patients
export const getPatients = async () => {
    return await Patient.find();
};

// Get patient by ID
export const getPatientById = async (id: mongoose.Types.ObjectId) => {
    return await Patient.findById(id);
};

// Create patient
export const createPatient = async (res: any) => {
    const newPatient = new Patient(res);
    await newPatient.save();
    return "Patient created successfully";
};

// Delete patient
export const deletePatient = async (id: mongoose.Types.ObjectId): Promise<boolean> => {
    const result = await Patient.findByIdAndDelete(id);
    return !!result;
};

// Update patient
export const updatePatient = async (id: mongoose.Types.ObjectId, res: any): Promise<string | undefined> => {
    const updatedPatient = await Patient.findByIdAndUpdate(id, res, { new: true });
    return updatedPatient ? "Patient updated successfully" : undefined;
};

// Toggle status from true to false
export const toggleStatus = async (id: mongoose.Types.ObjectId): Promise<string> => {
    const patient = await getPatientById(id); // Fetch the patient by ID
    if (!patient) return "Patient not found";

    // Toggle the patient's status
    patient.status = !patient.status;
    await patient.save();

    return "Status toggled successfully";
};
