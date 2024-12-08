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
    photo: null as File | null,
  });

  const [step, setStep] = useState(1); // Track the form step
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;
  const loggedInUserId = user ? user.id : '';

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
    if (formData.photo) {
      formDataPhoto.append('file', formData.photo);
    }
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8">
        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-gray-700">First Name:</label>
                <p className="text-gray-600">{formData.first_name}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Last Name:</label>
                <p className="text-gray-600">{formData.last_name}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Email:</label>
                <p className="text-gray-600">{formData.email}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Phone:</label>
                <p className="text-gray-600">{formData.phone}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Age:</label>
                <p className="text-gray-600">{formData.age}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Gender:</label>
                <p className="text-gray-600">{formData.gender}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Address:</label>
                <p className="text-gray-600">{formData.address}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-gray-700">Profile Picture:</label>
                {formData.photo && (
                  <img src={URL.createObjectURL(formData.photo)} alt="Profile" className="w-24 h-24 rounded-full" />
                )}
              </div>
              <button
                type="button"
                onClick={handleCompleteProfile}
                className="w-full bg-blue-500 text-white py-2 mt-6 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitStep2} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 2: Complete Your Profile</h2>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
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
