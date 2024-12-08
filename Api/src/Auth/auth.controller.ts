
import { Context } from "hono";
import { createService,authLoginService,authAdminLoginService,authDoctorLoginService,createDoctorService,createAdminService} from './auth.service';
import bcrypt from 'bcrypt'
import "dotenv/config" 
import{sign} from "hono/jwt"
import { User } from "./auth.service";
import { main } from "../mailer/email";


export const register = async (c: Context) => {
    try {
        const user = await c.req.json(); // Get the user data from the request
        const { role, password, email, first_name } = user;

        if (!password) {
            return c.json({ error: "Password is required" }, 400);
        }
          // Validate the email
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error("Invalid email format");
            }
        

        // hash password
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            return c.json({ error: 'Failed to hash password' }, 500);
        }
        

        let service;

        // Register based on the role (admin, doctor, or patient)
        if (role === 'admin') {
            service = await createAdminService(user);
        } else if (role === 'doctor') {
            service = await createDoctorService(user);
        } else {
            service = await createService(user);
        }

        if (!service) {
            return c.json({ error: `${role.charAt(0).toUpperCase() + role.slice(1)} not created` }, 404);
        }

        await main({ email:email, username: first_name });

        return c.json({ msg: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully. Email sent.` }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};


// Login Service (Handles Admin, Patient, and Doctor)
export const login = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();

        // Check for missing credentials
        if (!email || !password) {
            return c.json({ error: "Email and password are required." }, 400);
        }

        // Try to authenticate as admin first
        let user = await authAdminLoginService(email);

        if (!user) {
            // If not admin, try to authenticate as patient
            user = await authLoginService(email);
        }

        if (!user) {
            // If still not found, try to authenticate as doctor
            user = await authDoctorLoginService(email);
        }

        if (!user) {
            return c.json({ error: "User does not exist." }, 404);
        }

        const { id, first_name,last_name, role, password: storedPassword,status } = user as User;

         // Check if the user is disabled
         if (status === false) {
            return c.json({ error: "Account is disabled" }, 403);
        }

        // Check password match
        const passwordMatch = await bcrypt.compare(password, storedPassword);

        if (!passwordMatch) {
            return c.json({ error: "Invalid credentials." }, 401);
        } else {
            const payload = {
                id,
                first_name,
                last_name,
                role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180), // 3 hours expiration
            };

            const secret = process.env.JWT_SECRET as string;
            const token = await sign(payload, secret);

            // Return only the token, role, and id
            return c.json({ token, role, id, first_name,last_name }, 200);
        }
    } catch (error: any) {
        console.error("Error in login controller:", error);
        return c.json({ error: "An unexpected error occurred." }, 500);
    }
};
