import React,{ useState, useEffect } from 'react';
import { Doctor } from './card';
import { DoctorCard } from './card';
import { SearchFilters } from './filter';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Jennie Kim',
    specialty: 'Orthopedic',
    location: 'New York',
    about: 'Dr. Jennie is an orthopedic specialist with over 10 years of experience in sports medicine and joint reconstruction.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&fit=crop',
    rate: 150,
    availability: ['Mon', 'Wed', 'Fri'],
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: 2,
    name: 'Prof. Dr. Niall Horan',
    specialty: 'Cardiology',
    location: 'Los Angeles',
    about: 'Prof. Dr. Horan is a renowned cardiologist specializing in preventive cardiology and heart disease management.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&fit=crop',
    rate: 200,
    availability: ['Tue', 'Thu'],
    rating: 4.9,
    reviewCount: 243,
  },
  {
    id: 3,
    name: 'Dr. Alexandra Boje',
    specialty: 'Dermatology',
    location: 'San Francisco',
    about: 'Dr. Boje is a board-certified dermatologist focusing on both medical and cosmetic dermatology.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&fit=crop',
    rate: 175,
    availability: ['Mon', 'Wed', 'Thu'],
    rating: 4.7,
    reviewCount: 156,
  },
];

export default function DoctorSearch() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    availability: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(MOCK_DOCTORS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFavorite = (doctorId: number) => {
    setFavorites((prev) =>
      prev.includes(doctorId) ? prev.filter((id) => id !== doctorId) : [...prev, doctorId]
    );
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = doctor.specialty
      .toLowerCase()
      .includes(filters.specialty.toLowerCase());
    const matchesLocation = doctor.location
      .toLowerCase()
      .includes(filters.location.toLowerCase());
    const matchesAvailability = !filters.availability || 
      doctor.availability?.some(day => 
        day.toLowerCase().includes(filters.availability.toLowerCase())
      );
    return matchesSpecialty && matchesLocation && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Doctor</h1>
          <p className="text-muted-foreground">
            Search through our network of qualified healthcare professionals
          </p>
        </header>

        <section className="mb-8">
          <SearchFilters onFilterChange={handleFilterChange} />
        </section>

        <section>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Available Doctors ({filteredDoctors.length})
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    isFavorite={favorites.includes(doctor.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No doctors found matching your criteria</p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}