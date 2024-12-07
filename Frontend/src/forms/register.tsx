import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useGetPatientsQuery } from '../services/service';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import React from 'react';

type formData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
};

function Register() {
  const { register, handleSubmit, watch, clearErrors, formState: { errors } } = useForm<formData>();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const [registerUser, { isLoading }] = useRegisterUserMutation(); // Track loading state
  const navigate = useNavigate();
  const { data: users } = useGetPatientsQuery();
  const [uniqueEmails, setUniqueEmails] = useState<string[]>([]);

  useEffect(() => {
    if (users) {
      const uniqueEmails = [...new Set(users.map(user => user.email))];
      setUniqueEmails(uniqueEmails);
    }
  }, [users]);

  // Check password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return "default";
    if (password.length < 8) return "weak";
    if (/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) return "strong";
    return "medium";
  };
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    if (password) clearErrors("password");
  }, [password, clearErrors]);

  const onSubmit = async (data: formData) => {
    const userEmail = data.email.toLowerCase();
    if (uniqueEmails.includes(userEmail)) {
      toast.error("Email already exists. Please try another email.");
      return;
    }
  
    try {
      await registerUser(data).unwrap();
      toast.success('Registration successful!');
      navigate('/user-dashboard');
    } catch (error: any) {
      console.error("Registration error:", error);
  
      if (error?.status === 400) { 
        toast.error("This email is already registered.");
      } else if (error?.data?.message) { // handle custom error messages from backend
        toast.error(error.data.message);
      } else {
        toast.error("Failed to register! Please try again.");
      }
    }
  };
  

  return (
    <>
      <Toaster toastOptions={{ classNames: { error: 'bg-red-400', success: 'text-green-400' }}} />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-200 shadow-lg rounded-lg">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-serif mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name
              {errors.first_name && <span className="bg-red-700 text-white ml-2 rounded-lg">{errors.first_name.message}</span>}
              </label>
              <input type="text" id="first_name" placeholder="First Name" {...register("first_name", { required: "First name is required" })}
                className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-purple-200" />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name
              {errors.last_name && <span className="bg-red-700 text-white ml-2 rounded-lg">{errors.last_name.message}</span>}
              </label>
              <input type="text" id="last_name" placeholder="Last Name" {...register("last_name", { required: "Last name is required" })}
                className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-purple-200" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email
              {errors.email && <span className="bg-red-700 text-white ml-2 rounded-lg">Email is required</span>}
              </label>
              <input type="email" id="email" placeholder="Email" {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-purple-200" />
            </div>

            <div className="mb-3">
              <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">Phone Number
              {errors.phone && <span className="bg-red-700 text-white ml-2 rounded-lg">{errors.phone.message}</span>}
              </label>
              <input type="tel" id="contact_phone" placeholder="Phone Number" {...register("phone", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Please enter a valid phone number" } })}
                className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-purple-200" />
            </div>

            <div className="mb-3 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password
              {errors.password && <span className="bg-red-700 text-white ml-2 rounded-lg text-xs">{errors.password.message}</span>}
              </label>
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Create password" {...register("password", {
                  required: "Password is required",
                  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Include(at least 8 characters, one(uppercase,lowercase,number,special character))" }
                })}
                className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none ${passwordStrength === "weak" ? "border-red-600" : passwordStrength === "medium" ? "border-blue-600" : "border-green-600"}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 ">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
            <p className="text-center mt-2 text-gray-600">Already have an Account? <Link to="/login" className="text-purple-600 hover:text-purple-800">SignIn</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
