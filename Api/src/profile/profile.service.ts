// profile services
import mongoose from "mongoose";
import { Profile } from "../models/schema";

// Get all profiles
export const getProfiles = async () => {
    try {
        return await Profile.find();
    } catch (error: any) {
        throw new Error(`Failed to retrieve profiles: ${error.message}`);
    }
};

// Get profile by ID
export const getProfileById = async (id: mongoose.Types.ObjectId) => {
    try {
        const profile = await Profile.findById(id).populate({
            path: "user",
            select: "full_name email contact_phone",
        });

        if (!profile) {
            throw new Error("Profile not found");
        }
        return profile;
    } catch (error:any) {
        throw new Error(`Failed to retrieve profile: ${error.message}`);
    }
};

// Create profile
export const createProfile = async (res: any): Promise<string> => {
    try {
        const newProfile = new Profile(res);
        await newProfile.save();
        return "Profile created successfully";
    } catch (error:any) {
        throw new Error(`Failed to create profile: ${error.message}`);
    }
};

// Update profile
export const updateProfile = async (id: mongoose.Types.ObjectId, res: any): Promise<string | undefined> => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, res, { new: true });
        if (!updatedProfile) {
            throw new Error("Profile not found");
        }
        return "Profile updated successfully";
    } catch (error:any) {
        throw new Error(`Failed to update profile: ${error.message}`);
    }
};

// Delete profile
export const deleteProfile = async (id: mongoose.Types.ObjectId): Promise<boolean> => {
    try {
        const result = await Profile.findByIdAndDelete(id);
        return !!result;
    } catch (error:any) {
        throw new Error(`Failed to delete profile: ${error.message}`);
    }
};
