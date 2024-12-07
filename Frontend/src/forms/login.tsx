import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../services/service";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "./Auth/UserSlice";
import { setAdmin } from "./Auth/AdminSlice";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Toaster,toast } from "sonner";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import React from "react";
import { gapi } from 'gapi-script';
import GoogleLogins from "./component/googleLogin";

const clientId = '403625918155-rk4ftcc0qbvfjhelvu3oomqe4rec1ik2.apps.googleusercontent.com';




type formData = {
    email: string;
    password: string;
}

function Login() {
    const [userLogin] = useLoginUserMutation();
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<formData>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     function start() {
    //         if (gapi && gapi.client) {
    //             gapi.client.init({
    //                 clientId: clientId,
    //                 scope: "",
    //             }).then(() => {
    //                 // Handle successful initialization
    //             }).catch((error) => {
    //                 console.error("Error initializing gapi client:", error);
    //             });
    //         } else {
    //             console.error("gapi or gapi.client is not defined");
    //         }
    //     }

    //     gapi.load('auth2', start);
    // }, [])
 
    const onSubmit = async (data: formData) => {
        setLoading(true);

   
      
        try {
            const response = await userLogin(data).unwrap()
            
            
            const { token,id, first_name, role,last_name } = response;
         
            if (role && typeof role === 'string') {
                if (role.includes('admin')) {
                    dispatch(setAdmin({ token, first_name,last_name, role }));
                    navigate('/admin-dashboard');
                } else if (role.includes('user')) {
                    dispatch(login({ token,id, first_name,last_name, role }));
                    navigate('/user-dashboard');
                } else {
                    setErrorMessage("You do not have the required privileges.");
                    toast.error('You do not have the required privileges');
                }
            } else {
                setErrorMessage("Invalid role.");
                toast.error("Invalid role");
            }
        } catch (error) {
            setErrorMessage("Invalid email or password.");
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
        <Toaster toastOptions={{ classNames: { error: 'bg-red-400', success: 'text-green-400', warning: 'text-yellow-400', info: 'bg-blue-400'}}}/>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-200 shadow-lg rounded-lg md:rounded-none">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    {errorMessage && <p className="text-red-600 mb-4 text-center">{errorMessage}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-start text-gray-700">Enter your email  {errors.email && <span className="bg-red-700 text-white ml-2 rounded-lg">Email is required</span>}</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-200 bg-transparent"
                            />
                        </div>
                        <div className="w-full relative items-center">
                            <label htmlFor="password" className="block text-gray-700 text-start">Enter your password  {errors.password && <span className="bg-red-700 text-white ml-2 rounded-lg">Password required</span>}</label>
                            <div className="w-full flex items-center">
                            <input
                                 type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", { required: true })}
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-200 bg-transparent"/>
                              <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 focus:outline-none">
                                    {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Eye icon toggle */}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                    className="form-checkbox"
                                />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <Link to="/reset-password" target="_blank" className="text-purple-600 hover:text-purple-800">Forgot password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full mb-2 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? <PulseLoader color="#ffffff" /> : "Login Now"}
                        </button>
                    </form>
                    <div className="flex justify-between items-center">
                    <p className="text-center mt-4 text-gray-600">Not a member? <Link to="/register" className="text-purple-600 hover:text-purple-800">Signup</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
