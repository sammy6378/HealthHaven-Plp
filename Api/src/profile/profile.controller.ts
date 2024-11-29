import { getController,getAllController,createController,updateController,deleteController } from "../generics/gen.controller";
import { getProfiles,getProfileById,createProfile,updateProfile,deleteProfile } from "./profile.service";

export const getAllProfiles = getAllController(getProfiles);
export const getProfile = getController(getProfileById);
export const createProfileN = createController(createProfile);
export const updateProfileN = updateController(getProfileById,updateProfile);
export const deleteProfileN = deleteController(getProfileById,deleteProfile);