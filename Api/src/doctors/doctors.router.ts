
import { adminRoleAuth, bothAuth } from '../middleware/auth'
import { getAlldoctor,getdoctorById,createNewdoctor,deletedoctorById,updatedoctorN, toggleDoctorStatus } from './doctors.controller'

import { Hono } from 'hono'



export const doctorRouter = new Hono()

doctorRouter.get('/doctors', adminRoleAuth, getAlldoctor)
doctorRouter.get('/doctor/:id', bothAuth, getdoctorById)
doctorRouter.post('/doctor', adminRoleAuth, createNewdoctor)
doctorRouter.put('/doctor/:id', adminRoleAuth, updatedoctorN)
doctorRouter.delete('/doctor/:id', adminRoleAuth, deletedoctorById)
doctorRouter.put('toggle-doctor',adminRoleAuth,toggleDoctorStatus)