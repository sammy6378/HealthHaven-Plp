import { bothAuth, userRoleAuth } from '../middleware/auth'
import {getAllProfiles,getProfile,createProfileN,updateProfileN,deleteProfileN} from './profile.controller'

import { Hono } from 'hono'

export const profileRoutes = new Hono()

profileRoutes.get('/profiles',bothAuth, getAllProfiles)
profileRoutes.get('/profile/:id', userRoleAuth, getProfile)
profileRoutes.post('/profile', userRoleAuth, createProfileN)
profileRoutes.put('/profile/:id', bothAuth, updateProfileN)
profileRoutes.delete('/profile/:id',bothAuth, deleteProfileN)