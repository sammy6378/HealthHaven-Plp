// generics to handle the controller functions
import { Context } from "hono";
import mongoose from "mongoose";
// Helper function to get all entities
export const getAllEntity = async <T>(getFunction: () => Promise<T[]>) => {
    return await getFunction();
}

// Helper function to get one entity
export const getEntity = async <T>(id: mongoose.Types.ObjectId, getFunction: (id: mongoose.Types.ObjectId) => Promise<T | undefined>) => {
    return await getFunction(id);
}

// Helper function to create one entity
export const createEntity = async <T>(data: T, createFunction: (data: T) => Promise<T | undefined>) => {
    return await createFunction(data);
}

export const deleteEntity = async <T>(id: mongoose.Types.ObjectId, deleteFunction: (id: mongoose.Types.ObjectId) => Promise<boolean>) => {
    return await deleteFunction(id);
}

export const updateEntity = async <T>(id: mongoose.Types.ObjectId, data: T, updateFunction: (id: mongoose.Types.ObjectId, data: T) => Promise<T | undefined>) => {
    return await updateFunction(id, data);
}

export const searchEntity = async <T>(id:mongoose.Types.ObjectId,searchFunction: (id: mongoose.Types.ObjectId) => Promise<T | undefined>) =>{
    return await searchFunction(id);
}