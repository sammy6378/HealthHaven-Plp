
import mongoose from "mongoose";
import { Patient } from '../models/schema';

// Get all patients
export const getPatients = async () => {
    return await Patient.find().select('-password');;
};

// Get patient by ID
export const getPatientById = async (id: mongoose.Types.ObjectId) => {
    return await Patient.findById(id).select('-password');
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
