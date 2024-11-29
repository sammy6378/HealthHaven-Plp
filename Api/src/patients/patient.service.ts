

import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { patients } from "../drizzle/schema"
import { Context } from "hono"

// get all patients
export const getpatients = async ( )=>{
    return await db.query.patients.findMany()
}

// get patient by id
export const getpatient = async ( id:number)=>{
    return await db.query.patients.findFirst({
    where:eq(patients.patient_id,id)
})
}

// create patient
export const createPatient = async (res:any)=>{
    await db.insert(patients).values(res)
    return "Patient created successfully"
}

// delete patient
export const deletePatient = async (id:number):Promise<boolean>=>{
    await db.delete(patients).where(eq(patients.patient_id,id))
    return true
}

// update patient
export const updatePatient = async (id:number, res:any): Promise<string | undefined>=>{
    await db.update(patients).set(res).where(eq(patients.patient_id,id))
    return "patient updated successfully"
}

// toggle status from true to false
export const toggleStatus = async (id: number): Promise<string> => {
    const patient = await getpatient(id); // Fetch the patient by ID
    if (!patient) return "Patient not found";

    // Toggle the patient's status
    const newStatus = !patient.status;
    await db.update(patients)
        .set({ status: newStatus })
        .where(eq(patients.patient_id, id));

    return "Status toggled successfully";
};
