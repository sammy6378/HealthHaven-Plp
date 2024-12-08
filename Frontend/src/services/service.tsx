import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store/Store";

export interface TAuth {
    email:string;
    password:string;
}

export type TAuthResponse = {
    id:number;
    role:string;
    first_name: string;
    last_name: string;
    token:string;
}


export type TPatient ={
    id:number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    role:string;
    status:boolean;
    image: string | File | null;
}

export type Tpatients ={
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    role:string;
    image: string | File | null;
}

export type TRegister = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
}

export type TAppointment = {
    id:number;
    patient_id:number;
    doctor_id:number;
    date: Date;
    time: string;
    status: string;
    notes: string;
}

// profile
export type TProfile = {
    id:number;
    age: number;
    gender: string;
    address: string;
    image: string;
}


export type TLogin = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

// doctor

export type TDoctor ={
    id: number;
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
    phone: string;
    status:boolean;
    role: string;
    password: string;
}

export type TAdminPassword = {
    password: string;
    newPassword: string;
}

export const authService =createApi({
reducerPath: 'authApi',
baseQuery:fetchBaseQuery({
    baseUrl:'https://health-haven-plp.vercel.app',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
      
        const authToken = state.auth.token;

        // If a token exists, set it in the Authorization header
        if (authToken) {
          headers.set('Authorization', `Bearer ${authToken}`);
        }
      
        return headers;
      },
}),
endpoints: (builder) => ({
getPatients: builder.query<TPatient[],void>({
    query: () => 'api/patients',
}),

loginUser: builder.mutation<TAuthResponse,Partial<TAuth>>({
    query: (newUser) => ({
        url: 'auth/login',
        method: 'POST',
        body: newUser
    })
}),

registerUser: builder.mutation<TRegister[],Partial<TRegister>>({
    query: (newUser) => ({
        url: 'auth/register',
        method: 'POST',
        body: newUser
    })
}),

createAppointment: builder.mutation<TAppointment[],Partial<TAppointment>>({
    query: (appointment) => ({
        url: 'appointment',
        method: 'POST',
        body: appointment
})
}),

getAppointment: builder.query<TAppointment,number>({
    query: (id) => ({
        url: `appointment/${id}`,
        method: 'GET',
})
}),

// profile
getProfile: builder.query<TProfile[],void>({
    query: () => 'api/profiles',
}),

// get profile by id
getProfileById: builder.query<TProfile,number>({
    query: (id) => ({
        url: `api/profile/${id}`,
        method: 'GET',
})
}),

// create profile
createProfile: builder.mutation<TProfile[],Partial<TProfile>>({
    query: (patient) => ({
        url: 'api/profile',
        method: 'POST',
        body: patient
})
}),

// create doctor
createDoctor: builder.mutation<TDoctor[],Partial<TDoctor>>({
    query: (patient) => ({
        url: 'api/doctor',
        method: 'POST',     
        body: patient
})
}),

// get all doctors
getDoctors: builder.query<TDoctor[],void>({
    query: () => 'api/doctors',
}),

// create user
createUser: builder.mutation<Tpatients[],Partial<Tpatients>>({
    query: (patient) => ({
        url: 'api/create-patient',
        method: 'POST',     
        body: patient
})
}),

// fetch all users
getUsers: builder.query<TPatient[],void>({
    query: () => 'api/patients',
}),

// delete user
deleteUser: builder.mutation<TPatient[],number>({
    query: (id) => ({
        url: `api/patient/${id}`,
        method: 'DELETE'
})
}),

// togglestatus
toggleStatus: builder.mutation<TPatient[],number>({
    query: (id) => ({
        url: `api/toggle-status`,
        method: 'PUT',
        body: {id}
})
}),

// toggle doctor
toggleDoctor: builder.mutation<TDoctor[],number>({
    query: (id) => ({
        url: `api/toggle-doctor`,
        method: 'PUT',
        body: {id}
})
}),

// delete doctor

deleteDoctor: builder.mutation<TDoctor[],number>({
    query: (id) => ({
        url: `api/doctor/${id}`,
        method: 'DELETE'
})
}),

// change password
changePassword: builder.mutation<string,Partial<TAdminPassword>>({
    query: ({password,newPassword}) => ({
        url: 'api/change-password',
        method: 'POST',
        body: {password,newPassword}
    })
}),

// reset email
resetPassword: builder.mutation<string,Partial<TAuth>>({
    query: (user) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: user
    })
}),

}) 
})



export const { 
useGetPatientsQuery,
useLoginUserMutation,
useRegisterUserMutation, 
useCreateProfileMutation,
useCreateDoctorMutation,
useGetDoctorsQuery,
useCreateUserMutation,
useGetUsersQuery,
useDeleteUserMutation,
useToggleStatusMutation,
useToggleDoctorMutation,
useDeleteDoctorMutation,
useChangePasswordMutation,
useResetPasswordMutation,
useGetProfileByIdQuery,
} = authService;