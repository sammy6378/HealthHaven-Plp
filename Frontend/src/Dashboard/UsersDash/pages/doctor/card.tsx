import React from 'react';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  about: string;
  photoUrl: string;
  rate: number;
  availability?: string[];
  rating?: number;
  reviewCount?: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function DoctorCard({ doctor, isFavorite, onToggleFavorite }: DoctorCardProps) {
  return (
    <div className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-md">
      <div className="relative pb-4 px-4 pt-4">
        <button
          className={`absolute right-2 top-2 text-gray-400 hover:text-red-500 transition-colors ${
            isFavorite ? 'text-red-500' : ''
          }`}
          onClick={() => onToggleFavorite(doctor.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21l-1.45-1.317C5.4 15.368 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.868-8.55 11.183L12 21z"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">{doctor.location}</span>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">${doctor.rate}/hour</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{doctor.about}</p>
      </div>
      <div className="px-4 pb-4 flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          {doctor.availability?.map((slot) => (
            <span
              key={slot}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-50 rounded-full border"
            >
              {slot}
            </span>
          ))}
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Book Appointment</button>
      </div>
    </div>
  );
}
