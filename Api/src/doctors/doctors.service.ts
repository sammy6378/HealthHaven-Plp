
import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { doctors, patients } from "../drizzle/schema"
import {  resetEmail } from "../mailer/email"
import { Context } from "hono";
import { sign } from "hono/jwt";

// create new doctor

// get all doctors
export const getdoctors = async ( )=>{
    return await db.query.doctors.findMany()
}

// get doctor by id
export const getdoctor = async ( id:number)=>{
    return await db.query.doctors.findFirst({
    where:eq(doctors.doctor_id,id)
})
}

// create doctor
export const createdoctor = async (res:any)=>{
    await db.insert(doctors).values(res)
    return "doctor created successfully"
}

// delete doctor
export const deletedoctor = async (id:number):Promise<boolean>=>{
    await db.delete(doctors).where(eq(doctors.doctor_id,id))
    return true
}

// update doctor
export const updatedoctor = async (id:number, res:any): Promise<string | undefined>=>{
    await db.update(doctors).set(res).where(eq(doctors.doctor_id,id))
    return "doctor updated successfully"
}


// toggle status
export const toggleDoctor = async (id:number): Promise<string | undefined> =>{
    const doctor = await getdoctor(id)
    if(!doctor){
        return "doctor not found"
    }
    await db.update(doctors).set({status:!doctor.status}).where(eq(doctors.doctor_id,id))
    return "doctor status toggled successfully"
}


export const forgotPassword = async (c: Context) => {
    const { email } = await c.req.json();
    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }
  
    try {
      const user = await db.query.patients.findFirst({
        where: eq(patients.email, email),
      });
  
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }
  
      const secret = process.env.JWT_SECRET as string;
      const payload = {
        email,
        exp: Math.floor(Date.now() / 1000) + (60 * 180), 
      };
  
  
      // Generate the token synchronously
      const token = await sign(payload, secret); // Token expires in 3 hours
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
      await resetEmail(email, resetUrl);
  
      return c.json({ message: 'Reset link sent. Please check your email.' }, 200);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  };