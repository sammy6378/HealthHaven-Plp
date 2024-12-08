import { getAllController,getController,createController,deleteController,updateController } from "../generics/gen.controller";
import { getAppointments,getappointment,createappointment,deleteappointment,updateappointment } from "./appointment.service";

export const getAllappointment = getAllController(getAppointments)
export const getappointmentById = getController(getappointment)
export const createNewappointment = createController(createappointment)
export const deleteappointmentById = deleteController(getappointment, deleteappointment)
export const updateappointmentN = updateController(getappointment,updateappointment)