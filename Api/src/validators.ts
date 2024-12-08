import { z } from "zod";

export const registerPatientSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    image: z.string(),
    // status: z.boolean().default(true),
    role: z.string().optional()
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})



export const registeDoctorSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    specialization: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    image: z.string(),
    role: z.string().optional()
})


export const registerAdminSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
    role: z.string().optional()
})