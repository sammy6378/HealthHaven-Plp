import { Context } from "hono";
import { getAllController,getController,createController,deleteController,updateController } from "../generics/gen.controller";
import { getadmins,getadmin,createadmin,deleteadmin,updateadmin,changePassword } from "./admin.service";

export const getAlladmin = getAllController(getadmins)
export const getadminById = getController(getadmin)
export const createNewadmin = createController(createadmin)
export const deleteadminById = deleteController(getadmin, deleteadmin)
export const updateadminN = updateController(getadmin,updateadmin)


// Change password endpoint
export const updateAdminPassword = async (c: Context) => {
   
  try {
    const res = await c.req.json();
    const { password, newPassword } = res;

    if (!password || !newPassword) {
      return c.json({ error: "Missing required fields: password, newPassword" }, 400);
    }

    const user = c.get("user"); 
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    // Get the admin ID from authentication context (e.g., JWT payload or session)
    const { id } = user; 

    if (!id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const result = await changePassword(id, password, newPassword);

    if (result.error) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({ message: "Password updated successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Failed to change password", details: (error as any).message }, 500);
  }
};
