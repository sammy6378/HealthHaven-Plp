import { Context } from "hono";
import { Patient, Admin, Doctor } from "../models/schema";
import bcrypt from 'bcrypt'

export type TPatient = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    role: string;
};

export type TDoctor = {
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
    phone: string;
    image: string;
    status: boolean;
    role: string;
    password: string;
};

export type TAdmin = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
};

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    status: boolean;
    password: string;
}

// Register patient Service
export const createService = async (patientData: TPatient): Promise<string | null> => {
    const { email } = patientData;

    try {
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            throw new Error("Patient with this email already exists");
        }

        const newPatient = new Patient(patientData);
        await newPatient.save();

        return "Patient created successfully";
    } catch (error: any) {
        throw new Error(error.message || "Failed to create patient");
    }
};

// Register Doctor Service
export const createDoctorService = async (doctorData: TDoctor): Promise<string | null> => {
    const { email } = doctorData;

    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            throw new Error("Doctor with this email already exists");
        }

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        return "Doctor created successfully";
    } catch (error: any) {
        throw new Error(error.message || "Failed to create doctor");
    }
};

// Register Admin Service
export const createAdminService = async (adminData: TAdmin): Promise<string | null> => {
    const { email } = adminData;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new Error("Admin with this email already exists");
        }

        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        return "Admin created successfully";
    } catch (error: any) {
        throw new Error(error.message || "Failed to create admin");
    }
};

// Login patient Service
export const authLoginService = async (email: string): Promise<User | null> => {
    try {
        const patient = await Patient.findOne({ email });

        if (!patient) {
            return null;
        }

        return {
            id: patient._id.toString(),
            first_name: patient.first_name,
            last_name: patient.last_name,
            role: patient.role,
            status: patient.status,
            password: patient.password,
        };
    } catch (error) {
        console.error("Error in authLoginService:", error);
        return null;
    }
};

// Admin Login Service
export const authAdminLoginService = async (email: string): Promise<User | null> => {
    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return null;
        }

        return {
            id: admin._id.toString(),
            first_name: admin.first_name,
            last_name: admin.last_name,
            role: admin.role,
            status: true, 
            password: admin.password,
        };
    } catch (error) {
        console.error("Error in authAdminLoginService:", error);
        return null;
    }
};

// Doctor Login Service
export const authDoctorLoginService = async (email: string): Promise<User | null> => {
    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return null;
        }

        return {
            id: doctor._id.toString(),
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            role: doctor.role,
            status: doctor.status,
            password: doctor.password,
        };
    } catch (error) {
        console.error("Error in authDoctorLoginService:", error);
        return null;
    }
};

// Reset Password Service
export const resetPasswordService = async (email: string, newPassword: string): Promise<string> => {
    try {
        const user = await Patient.findOne({ email }) ||
                     await Doctor.findOne({ email }) ||
                     await Admin.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return "Password reset successfully";
    } catch (error: any) {
        throw new Error(error.message || "Failed to reset password");
    }
};
