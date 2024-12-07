import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import {  useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../services/service";


export type TReset = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

function ResetPassword() {
  const [isResetSuccessful, setIsResetSuccessful] = useState(false); // Tracks if password reset was successful
  const [reset] = useChangePasswordMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<TReset>();
  const navigate = useNavigate();

  
  const onSubmit = async (data: TReset) => {

    try {
      await reset({ password: data.password }).unwrap();
      setIsResetSuccessful(true); // Set reset successful state to true
      toast('Password reset successful. You can now log in.');
    } catch (error) {
      toast('An error occurred. Please try again.');
    }
  };

  const password = watch("password");

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
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Password Reset Successful!</h2>
            <p className="mb-4 text-gray-600">Your password has been successfully reset. You can now log in with your new password.</p>
            <button
              onClick={handleGoToLogin}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reset Your Password</h2>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black bg-white focus:ring-2 focus:ring-purple-200"
            />
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black bg-white focus:ring-2 focus:ring-purple-200"
            />
            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Reset Password
            </button>
            <p className="mt-6 text-sm text-gray-600">
              By clicking the "Reset Password" button, you agree to our{' '}
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

export default ResetPassword;
