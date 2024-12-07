/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetPatientsQuery, useCreateProfileMutation } from '../../../services/service';
import axios from 'axios';
import { RootState } from '../../../store/Store';
import { TAuthResponse } from '../../../services/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    photo: '',
  });

  const [step, setStep] = useState(1); // Track the form step
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;
  const loggedInUserId = user ? user.patient_id : '';

  const { data: patients } = useGetPatientsQuery();
  const [createProfile, { error }] = useCreateProfileMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patients) {
      const userPatientData = patients.find((patient) => patient.patient_id === loggedInUserId);
      if (userPatientData) {
        setFormData((prev) => ({
          ...prev,
          first_name: userPatientData.first_name,
          last_name: userPatientData.last_name,
          email: userPatientData.email,
          phone: userPatientData.phone,
        }));
      }
    }
  }, [patients, loggedInUserId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleCompleteProfile = () => {
    setStep(2); // Move to step 2
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataPhoto = new FormData();
    formDataPhoto.append('file', formData.photo);
    formDataPhoto.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);
    formDataPhoto.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/ndekei/image/upload', formDataPhoto);
      const photoUrl = response.data.secure_url;

      const data = {
        age: Number(formData.age),
        gender: formData.gender,
        address: formData.address,
        image: photoUrl,
      };

      await createProfile(data).unwrap();
      toast.success('Profile created successfully!');
    } catch (error) {
      console.error('Error uploading photo or saving profile:', error);
      toast.error('Error creating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 1: Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                placeholder='First Name'
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
              <button
                type="button"
                onClick={handleCompleteProfile}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Complete Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitStep2} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Complete Your Profile</h2>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder='Age'
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder='Gender'
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder='Address'
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            ></textarea>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
