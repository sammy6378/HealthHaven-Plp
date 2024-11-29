import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { login, register } from './auth.controller'
import { registerPatientSchema,loginSchema, registeDoctorSchema,registerAdminSchema } from '../validators'
import { forgotPassword } from '../doctors/doctors.service';


// Create router instance
export const authRouters = new Hono();

// Register Routes

 // Register patient
authRouters.post('/register', zValidator('json', registerPatientSchema, (result, c) => {
     if (!result.success) {
            return c.json(result.error, 400)
        }
     }), register); 

// Register doctor
authRouters.post('/register', zValidator('json', registeDoctorSchema, (result, c) => {
    if (!result.success) {
           return c.json(result.error, 400)
       }
    }),  register);

// Register admin
authRouters.post('/register',zValidator('json', registerAdminSchema, (result, c) => {
    if (!result.success) {
           return c.json(result.error, 400)
       }
    }),  register);    


// Login Routes  
// Login admin
authRouters.post('/login',zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
           return c.json(result.error, 400)
       }
    }), login);

export default authRouters;

authRouters.post('/reset-password', forgotPassword)