import React from 'react';

interface SearchFiltersProps {
  onFilterChange: (field: string, value: string) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
        <input
          id="specialty"
          placeholder="Search by specialty..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => onFilterChange('specialty', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          id="location"
          placeholder="Search by location..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => onFilterChange('location', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
        <input
          id="availability"
          placeholder="Search by availability..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => onFilterChange('availability', e.target.value)}
        />
      </div>
    </div>
  );
}