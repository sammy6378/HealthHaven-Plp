
import { adminRoleAuth } from '../middleware/auth'
import { getAlladmin,getadminById,createNewadmin,deleteadminById,updateadminN, updateAdminPassword } from './admin.controller'

import { Hono } from 'hono'



export const adminRouter = new Hono()

adminRouter.get('/admins', getAlladmin)
adminRouter.get('/admin/:id', getadminById)
adminRouter.post('/admin', createNewadmin)
adminRouter.put('/admin/:id', updateadminN)
adminRouter.delete('/admin/:id', deleteadminById)
adminRouter.post('/change-password',adminRoleAuth, updateAdminPassword)