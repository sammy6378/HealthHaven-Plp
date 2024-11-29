import {getAllProfiles,getProfile,createProfileN,updateProfileN,deleteProfileN} from './profile.controller'

import { Hono } from 'hono'

export const profileRoutes = new Hono()

profileRoutes.get('/profiles', getAllProfiles)
profileRoutes.get('/profile/:id', getProfile)
profileRoutes.post('/profile', createProfileN)
profileRoutes.put('/profile/:id', updateProfileN)
profileRoutes.delete('/profile/:id', deleteProfileN)