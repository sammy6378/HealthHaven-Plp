import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/service";  // Update mutation to use email

export type TResetEmail = {
  email: string;
};

function ResetPasswordEmail() {
  const [isResetSuccessful, setIsResetSuccessful] = useState(false); // Tracks if email reset was successful
  const [resetPasswordEmail] = useResetPasswordMutation(); // Updated mutation for email
  const { register, handleSubmit, formState: { errors } } = useForm<TResetEmail>();
  const navigate = useNavigate();

  const onSubmit = async (data: TResetEmail) => {
    try {
      // Call the reset email mutation
      await resetPasswordEmail({ email: data.email }).unwrap();
      setIsResetSuccessful(true); // Set reset successful state to true
      toast('Password reset email sent successfully! Please check your inbox.');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  // Redirect the user to login page after success message is shown
  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
        <ToastContainer />

        {isResetSuccessful ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Check Your Email!</h2>
            <p className="mb-4 text-gray-600">We have sent a password reset link to your email address. Please check your inbox and follow the instructions.</p>
            <button
              onClick={handleGoToLogin}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reset Your Password</h2>
            <small className=" text-orange-400" >
            *Your registered email</small>
            <input
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" } })}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black bg-white focus:ring-2 focus:ring-purple-200"
            />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Reset Email
            </button>
            <p className="mt-6 text-sm text-gray-600">
              By clicking the "Send Reset Link" button, you agree to our{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-600">Log in</a>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-500 hover:text-blue-600">Sign up</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordEmail;
