
// profile services
import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { profile } from "../drizzle/schema"


// get all profiles

export const getProfiles = async ( )=>{
    return await db.query.profile.findMany()
}

// get profile by id
export const getProfileById = async (id:number) =>[
    await db.query.profile.findFirst({
        where:eq(profile.profile_id,id),
        with:{
            user:{
                columns:{
                    full_name:true,
                    email:true,
                    contact_phone:true,
                }
            }
        }

    })
]

// create profile
export const createProfile = async (res:any):Promise<string> => {
    await db.insert(profile).values(res)
    return 'Profile created successfully';
}

// update profile
export const updateProfile = async (id:number, res:any):Promise<string | undefined> => {
    await db.update(profile).set(res).where(eq(profile.profile_id,id))
    return "profile updated successfully"
}

// delete profile
export const deleteProfile = async (id:number):Promise<boolean> => {
    await db.delete(profile).where(eq(profile.profile_id,id))
    return true
}