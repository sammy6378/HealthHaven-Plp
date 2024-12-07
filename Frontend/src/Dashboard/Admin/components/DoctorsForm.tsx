/// <reference types="vite/client" />
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '../../../services/service';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

type formData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  specialization: string;
  image: File | string | null;
};

const CreateDoctor: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<formData>();
  const [loading, setLoading] = useState(false);
  const [createDoctor] = useRegisterUserMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null); 



  // Handle form submission
  const onSubmit = async (data: formData) => {
    setLoading(true);
    try {
      if (data.image && data.image instanceof File) {
        // Upload image to Cloudinary
        const imageUrl = await uploadImageToCloudinary(data.image);
        // Add the Cloudinary URL to the form data before submitting
        data.image = imageUrl;
      }

      console.log(data);
      // Send form data (with image URL) to the backend
      await createDoctor(data).unwrap(); // Unwrap result to get the return value
      toast.success('Doctor created successfully!');
      reset();
      setImagePreview(null);
    } catch (error) {
      toast.error('Failed to create doctor.');
    } finally {
      setLoading(false);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET); // Your Cloudinary preset
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME); // Your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the image URL
    } catch (error) {
      throw new Error('Image upload failed.');
    }
  };

  // Handle file input change to update preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("image", file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Create Doctor</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              {...register("first_name", { required: "First Name is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              {...register("last_name", { required: "Last Name is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Specialization</label>
            <input
              type="text"
              {...register("specialization", { required: "Specialization is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.specialization && <p className="text-red-600">{errors.specialization.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              {...register("role", { required: "Role is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              // onChange={(e) => setValue("image", e.target.files?.[0] || null)}
              onChange={handleFileChange}
              className="w-full p-3 border rounded"
            />
            {errors.image && <p className="text-red-600">{errors.image.message}</p>}

            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-full h-32 w-32 object-cover" />}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            {loading ? "Creating..." : "Create Doctor"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateDoctor;
