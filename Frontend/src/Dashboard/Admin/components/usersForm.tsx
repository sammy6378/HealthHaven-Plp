/// <reference types="vite/client" />
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { Tpatients, useCreateUserMutation } from '../../../services/service';

const CreateUser: React.FC = () => {
  const [createUser] = useCreateUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Tpatients>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      role: 'user',
    },
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET); // Replace with your preset
    data.append('cloud_name', import.meta.env.VITE_CLOUD_NAME); // Replace with your cloud name

    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const json = await response.json();
    return json.secure_url;
  };

  const onSubmit: SubmitHandler<Tpatients> = async (data) => {
    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (data.image && data.image instanceof File) {
        imageUrl = await uploadToCloudinary(data.image);
      }

      const payload = {
        ...data,
        image: imageUrl || null,
      };

      await createUser(payload);
      toast.success('User created successfully!');
      reset();
      setImagePreview(null);
    } catch (error) {
      toast.error('Failed to create user.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <h1 className="text-3xl font-bold mb-6">Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            {...register('first_name', { required: 'First Name is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            {...register('last_name', { required: 'Last Name is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            {...register('role', { required: 'Role is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.role && <p className="text-red-600">{errors.role.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border rounded"
          />
        {errors.image && <p className="text-red-600">{errors.image.message}</p>}
          
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-full h-32 w-32 object-cover" />}
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50' : ''
            }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateUser;
