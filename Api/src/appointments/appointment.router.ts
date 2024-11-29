
import { getAllappointment,getappointmentById,createNewappointment,deleteappointmentById,updateappointmentN } from './appointment.controller'

import { Hono } from 'hono'



export const appointmentRouter = new Hono()

appointmentRouter.get('/appointments', getAllappointment)
appointmentRouter.get('/appointment/:id', getappointmentById)
appointmentRouter.post('/appointment', createNewappointment)
appointmentRouter.put('/appointment/:id', updateappointmentN)
appointmentRouter.delete('/appointment/:id', deleteappointmentById)