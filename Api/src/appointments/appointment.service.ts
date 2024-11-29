
import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { appointments } from "../drizzle/schema"

// create new appointment

// get all appointments
export const getappointments = async ( )=>{
    return await db.query.appointments.findMany()
}

// get appointment by id
export const getappointment = async ( id:number)=>{
    return await db.query.appointments.findFirst({
    where:eq(appointments.appointment_id,id)
})
}

// create appointment
export const createappointment = async (res:any)=>{
    await db.insert(appointments).values(res)
    return "appointment created successfully"
}

// delete appointment
export const deleteappointment = async (id:number):Promise<boolean>=>{
    await db.delete(appointments).where(eq(appointments.appointment_id,id))
    return true
}

// update appointment
export const updateappointment = async (id:number, res:any): Promise<string | undefined>=>{
    await db.update(appointments).set(res).where(eq(appointments.appointment_id,id))
    return "appointment updated successfully"
}