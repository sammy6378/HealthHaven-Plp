import { patients,admins,doctors } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm"



export type TPatient = {
    patient_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    role: string;
}

export type TDoctor ={
    doctor_id: number;
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
    phone: string;
    image: string;
    status: boolean;
    role: string;
    password: string;
}

export type TAdmin ={
    admin_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
}


export interface User {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    status: boolean;
    password: string;
}


// Register patient Service
export const createService = async (patientData:TPatient):Promise<string | null> => {
    const { email } = patientData;

    try {
        // Check if a patient with the provided email already exists
        const existingPatient = await db
            .select()
            .from(patients)
            .where(eq(patients.email, email))
            .then((patients) => patients[0]);

        if (existingPatient) {
            throw new Error("Patient with this email already exists");
        }

        // Insert the new patient into the database
        const [newPatient] = await db
            .insert(patients)
            .values({
                first_name: patientData.first_name,
                last_name: patientData.last_name,
                email: patientData.email,
                password: patientData.password,
                phone: patientData.phone,
                image: patientData.image,
            })
            .returning({
                id: patients.patient_id,
                first_name: patients.first_name,
                last_name: patients.last_name,
                email: patients.email,
                image: patients.image,
                password: patients.password,
                phone: patients.phone,
            });

        return "Patient created successfully";
    } catch (error: any) {
        // Checking if the error is related to a unique constraint violation
        if (error.code === '23505' && error.detail.includes('patients_email_unique')) {
            throw new Error('A patient with this email already exists');
        }
        
        // Throw the error 
        throw new Error(error.message || 'Failed to create patient');
    }
};


// Register Doctor Service
export const createDoctorService = async (doctorData: TDoctor): Promise<string | null> => {
    const { email } = doctorData;

    try {
        // Check if a doctor with the provided email already exists
        const existingDoctor = await db
            .select()
            .from(doctors)
            .where(eq(doctors.email, email))
            .then((doctors) => doctors[0]);

        if (existingDoctor) {
            throw new Error("Doctor with this email already exists");
        }

     
        // Insert the new doctor into the database
        const [newDoctor] = await db
            .insert(doctors)
            .values({
                first_name: doctorData.first_name,
                last_name: doctorData.last_name,
                password: doctorData.password,
                specialization: doctorData.specialization,
                email: doctorData.email,
                phone: doctorData.phone,
                image: doctorData.image,
                role: doctorData.role, // Ensure role is set to 'doctor'
            })
            .returning({
                id: doctors.doctor_id,
                first_name: doctors.first_name,
                last_name: doctors.last_name,
                email: doctors.email,
                role: doctors.role,
            });

        return "Doctor created successfully";
    } catch (error: any) {
        if (error.code === '23505' && error.detail.includes('doctors_email_unique')) {
            throw new Error('A doctor with this email already exists');
        }

        throw new Error(error.message || 'Failed to create doctor');
    }
};


// Register Admin Service
export const createAdminService = async (adminData: TAdmin): Promise<string | null> => {

    const { email } = adminData;

    try {
        // Check if an admin with the provided email already exists
        const existingAdmin = await db
            .select()
            .from(admins)
            .where(eq(admins.email, email))
            .then((admins) => admins[0]);

        if (existingAdmin) {
            throw new Error("Admin with this email already exists");
        }

        // Insert the new admin into the database
        const [newAdmin] = await db
            .insert(admins)
            .values({
                first_name: adminData.first_name,
                last_name: adminData.last_name,
                email: adminData.email,
                password: adminData.password,
                role: adminData.role, // Ensure role is set to 'admin'
            })
            .returning({
                id: admins.admin_id,
                first_name: admins.first_name,
                last_name: admins.last_name,
                email: admins.email,
                role: admins.role,
            });

        return "Admin created successfully";
    } catch (error: any) {
        if (error.code === '23505' && error.detail.includes('admins_email_unique')) {
            throw new Error('An admin with this email already exists');
        }

        throw new Error(error.message || 'Failed to create admin');
    }
}


// Login patient Service
export const authLoginService = async (email: string): Promise<User | null> => {
    try {
        // Query the patient with the provided email
        const patient = await db
            .select()
            .from(patients)
            .where(eq(patients.email, email))
            .then((patients) => patients[0]);

        if (!patient) {
            return null; // Return null if no patient is found
        }

        return {
            id: patient.patient_id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            role: patient.role,
            status: patient.status,
            password: patient.password,
        };
    } catch (error) {
        console.error("Error in authLoginService:", error); // Log the error details
        return null; // Return null in case of an error
    }
};



// Admin Login Service
export const authAdminLoginService = async (email: string): Promise<User | null> => {
    try {
        // Query the admin with the provided email
        const admin = await db
            .select()
            .from(admins)
            .where(eq(admins.email, email))
            .then((admins) => admins[0]);

        if (!admin) {
            return null; // Return null if no admin is found
        }

        return {
            id: admin.admin_id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            role: admin.role,
            status: admin.status,
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
        // Query the doctor with the provided email
        const doctor = await db
            .select()
            .from(doctors)
            .where(eq(doctors.email, email))
            .then((doctors) => doctors[0]);

        if (!doctor) {
            return null; // Return null if no doctor is found
        }

        return {
            id: doctor.doctor_id,
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



// reset password
