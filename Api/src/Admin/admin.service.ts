

import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { admins } from "../drizzle/schema"
import bcrypt from "bcrypt";

// get all admin
export const getadmins = async ( )=>{
    return await db.query.admins.findMany()
}

// get admin by id
export const getadmin = async ( id:number)=>{
    return await db.query.admins.findFirst({
    where:eq(admins.admin_id,id)
})
}

// create admin
export const createadmin = async (res:any)=>{
    await db.insert(admins).values(res)
    return "admin created successfully"
}

// delete admin
export const deleteadmin = async (id:number):Promise<boolean>=>{
    await db.delete(admins).where(eq(admins.admin_id,id))
    return true
}

// update admin
export const updateadmin = async (id:number, res:any): Promise<string | undefined>=>{
    await db.update(admins).set(res).where(eq(admins.admin_id,id))
    return "admin updated successfully"
}



// Change password logic
export const changePassword = async (
  id: number,
  password: string,
  newPassword: string
): Promise<{ error?: string; message?: string }> => {
  const data = await getadmin(id);

  if (!data) {
    return { error: "Admin not found" };
  }

  // Compare existing password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, data.password);

  if (!isPasswordCorrect) {
    return { error: "Incorrect password" };
  }

  // Hash the new password before updating
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await db.update(admins).set({ password: hashedNewPassword }).where(eq(admins.admin_id, id));

  return { message: "Password changed successfully" };
};
