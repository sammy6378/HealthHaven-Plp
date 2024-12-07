import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';  // For heart icons

const DoctorSearch = () => {
  interface Doctor {
    id: number;
    name: string;
    specialty: string;
    location: string;
    about: string;
    photoUrl: string;
    rate: number;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ specialty: '', location: '' });
  const [favorites, setFavorites] = useState<number[]>([]);

  const { register, watch } = useForm();

  // Simulate data fetch based on search criteria
  const onSearch = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setDoctors([
        {
          id: 1,
          name: 'Dr. Jennie Kim',
          specialty: 'Orthopedic',
          location: 'New York',
          about: 'Dr. Jennie is an orthopedic specialist.',
          photoUrl: 'https://i.pinimg.com/564x/82/44/0c/82440ceb82dfe05fc5dea117429f5a0d.jpg',
          rate: 36,
        },
        {
          id: 2,
          name: 'Prof. Dr. Niall Horan',
          specialty: 'Orthopedic',
          location: 'Los Angeles',
          about: 'Prof. Dr. Horan has years of experience in orthopedics.',
          photoUrl: 'https://i.pinimg.com/564x/12/73/e6/1273e67e6ab6d5a540059384cefcaf7a.jpg',
          rate: 36,
        },
        {
          id: 3,
          name: 'Dr. Alexandra Boje',
          specialty: 'Orthopedic',
          location: 'San Francisco',
          about: 'Dr. Boje specializes in orthopedic surgery.',
          photoUrl: 'https://i.pinimg.com/564x/2d/5b/dc/2d5bdc35f44072efcf1fb2a9186f6af4.jpg',
          rate: 36,
        },
        // Add more doctors...
      ]);
      setLoading(false);
    }, 1000);
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(filter.specialty.toLowerCase()) &&
    doc.location.toLowerCase().includes(filter.location.toLowerCase())
  );

  // Automatically trigger search based on input
  React.useEffect(() => {
    onSearch();
  }, [filter.specialty, filter.location]);

  const toggleFavorite = (doctorId: number) => {
    setFavorites((prev) =>
      prev.includes(doctorId) ? prev.filter((id) => id !== doctorId) : [...prev, doctorId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Find Doctor</h1>

      <div className="flex space-x-4 mb-8">
        <input
          {...register('specialty')}
          type="text"
          placeholder="Search by Specialty"
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilter({ ...filter, specialty: e.target.value })}
        />
        <input
          {...register('location')}
          type="text"
          placeholder="Search by Location"
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-transparent rounded-lg shadow-md p-4 border border-green-600 hover:shadow-lg cursor-pointer transition-shadow duration-300 relative"
              >
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
                <h3 className="font-bold text-center mt-4">{doctor.name}</h3>
                <p className="text-center text-gray-600">{doctor.specialty}</p>
                <p className="text-center text-gray-600">{doctor.location}</p>
                {/* <p className="text-center text-gray-600">About: {doctor.about}</p> */}
               

                {/* Heart Icon to toggle favorites */}
                <div
                  onClick={() => toggleFavorite(doctor.id)}
                  className="absolute top-2 right-2 cursor-pointer text-red-500"
                >
                  {favorites.includes(doctor.id) ? (
                    <AiFillHeart size={24} />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorSearch;
