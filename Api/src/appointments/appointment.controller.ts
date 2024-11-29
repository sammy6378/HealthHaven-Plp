import { getAllController,getController,createController,deleteController,updateController } from "../generics/gen.controller";
import { getappointments,getappointment,createappointment,deleteappointment,updateappointment } from "./appointment.service";

export const getAllappointment = getAllController(getappointments)
export const getappointmentById = getController(getappointment)
export const createNewappointment = createController(createappointment)
export const deleteappointmentById = deleteController(getappointment, deleteappointment)
export const updateappointmentN = updateController(getappointment,updateappointment)