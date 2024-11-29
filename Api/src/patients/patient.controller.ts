import { Context } from "hono";
import { getAllController,getController,createController,deleteController,updateController } from "../generics/gen.controller";
import { getpatients,getpatient,createPatient,deletePatient,updatePatient } from "./patient.service";
import { toggleStatus } from "./patient.service";




export const getAllPatient = getAllController(getpatients)
export const getPatientById = getController(getpatient)
export const createNewPatient = createController(createPatient)
export const deletePatientById = deleteController(getpatient, deletePatient)
export const updatePatientN = updateController(getpatient,updatePatient)


// toggle patient status
export const togglePatientStatus = async (c: Context) => {
    try {
        const data = await c.req.json();
        
        const { id } = data;

        if (!id) {
            return c.json({ error: "Missing required field: id" }, 400);
        }

        const result = await toggleStatus(Number(id)); // Toggle status for the given patient ID

        if (result === "Patient not found") {
            return c.json({ error: result }, 404);
        }

        return c.json({ message: result }, 200);
    } catch (error) {
        return c.json({ error: "Failed to toggle status", details: (error as any).message }, 500);
    }
};
