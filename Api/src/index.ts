
import { Hono } from "hono";
import 'dotenv/config'
import { serve } from "@hono/node-server";
import { cors } from 'hono/cors'
import { doctorRouter } from "./doctors/doctors.router";
import authRouters from "./Auth/auth.router";
import { patientRouter } from "./patients/patient.router";
import { appointmentRouter } from "./appointments/appointment.router";
import { adminRouter } from "./Admin/admin.router";


const app = new Hono();

const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://health-haven-plp-front.vercel.app' // Deployed frontend URL
  : 'http://localhost:5173'; // Local development URL

app.use('*', cors({
  origin: allowedOrigin,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600
}));


// app.use('*', cors())


// server

const port = process.env.PORT || 5000;

app.get('/',(c) =>{
    return c.text('Welcome to the Telemedicine Management System')
})

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
  })



// routers
app.route('/api',doctorRouter)
app.route('/api',appointmentRouter)
app.route('/api',patientRouter)
app.route('/api', adminRouter)
app.route('/auth',authRouters)