import React from 'react';
import { useChangePasswordMutation } from '../../../services/service';
import { useForm } from 'react-hook-form';
import { toast,ToastContainer } from 'react-toastify';

interface FormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  // useForm hook from react-hook-form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      // Call mutation to change the password
      await changePassword({ password: data.password, newPassword: data.newPassword }).unwrap();
      toast.success('Password changed successfully!');
    } catch (error: any) {
      // Handle error: check if it's an incorrect password or other issue
      if (error?.message === 'Current password is incorrect') {
        toast.error('Current password is incorrect');
      } else {
        toast.error('Failed to change password');
      }
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        {/* Old Password */}
        <div>
          <label className="block text-gray-700">Old Password</label>
          <input
            type="password"
            {...register("password", { required: "Current password is required" })}
            className="w-full p-3 border rounded"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            {...register("newPassword", { required: "New password is required" })}
            className="w-full p-3 border rounded"
          />
          {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => value === watch('newPassword') || "Passwords do not match",
            })}
            className="w-full p-3 border rounded"
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </form>
    </div>
    </>
  );
};

export default ChangePassword;
