// generics to handle the controller functions
import { Context } from "hono";

// Helper function to get all entities
export const getAllEntity = async <T>(getFunction: () => Promise<T[]>) => {
    return await getFunction();
}

// Helper function to get one entity
export const getEntity = async <T>(id: number, getFunction: (id: number) => Promise<T | undefined>) => {
    return await getFunction(id);
}

// Helper function to create one entity
export const createEntity = async <T>(data: T, createFunction: (data: T) => Promise<T | undefined>) => {
    return await createFunction(data);
}

export const deleteEntity = async <T>(id: number, deleteFunction: (id: number) => Promise<boolean>) => {
    return await deleteFunction(id);
}

export const updateEntity = async <T>(id: number, data: T, updateFunction: (id: number, data: T) => Promise<T | undefined>) => {
    return await updateFunction(id, data);
}

export const searchEntity = async <T>(id:number,searchFunction: (id: number) => Promise<T | undefined>) =>{
    return await searchFunction(id);
}