import { Context } from "hono";
import { getAllController,getController,createController,deleteController,updateController } from "../generics/gen.controller";
import { getdoctors,getdoctor,createdoctor,deletedoctor,updatedoctor,toggleDoctor } from "./doctors.service";

export const getAlldoctor = getAllController(getdoctors)
export const getdoctorById = getController(getdoctor)
export const createNewdoctor = createController(createdoctor)
export const deletedoctorById = deleteController(getdoctor, deletedoctor)
export const updatedoctorN = updateController(getdoctor,updatedoctor)


// toggle status
export const toggleDoctorStatus = async(c:Context) =>{

    try {
        const data = await c.res.json();
        
        const { id } = data;
        
        if (!id) {
            return c.json({ error: "Missing required field: id" }, 400);
        }
        
        const result = await toggleDoctor(id); // Toggle status for the given doctor ID
        
        if (result === "Doctor not found") {
            return c.json({ error: result }, 404);
        }
        return c.json({ message: result }, 200);
    } catch (error) {  
        return c.json({ error: "Failed to toggle status", details: (error as any).message }, 500);
    }
}

