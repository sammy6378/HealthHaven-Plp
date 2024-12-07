import React, { useState } from 'react';

const medicinesData = [
  { name: 'Paracetamol', category: 'Pain Relief', quantity: 200, price: 5.0, expiry: '2025-10-01' },
  { name: 'Ibuprofen', category: 'Pain Relief', quantity: 150, price: 8.0, expiry: '2024-08-15' },
  { name: 'Amoxicillin', category: 'Antibiotic', quantity: 300, price: 12.0, expiry: '2025-01-20' },
  { name: 'Cetirizine', category: 'Antihistamine', quantity: 180, price: 4.5, expiry: '2024-12-10' },
  { name: 'Aspirin', category: 'Pain Relief', quantity: 400, price: 6.0, expiry: '2026-03-30' },
  // Add more medicines here as needed.
];

const Medicines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const medicinesPerPage = 3;

  // Filtering and pagination logic
  const filteredMedicines = medicinesData.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

  const totalPages = Math.ceil(filteredMedicines.length / medicinesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Medicine Inventory</h2>

      {/* Search Input */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center border border-blue-300 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search medicine..."
            className="p-3 w-72 outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.length > 0 ? (
              currentMedicines.map((medicine, index) => (
                <tr key={index} className="hover:bg-blue-50 transition duration-150">
                  <td className="p-4">{medicine.name}</td>
                  <td className="p-4">{medicine.category}</td>
                  <td className="p-4">{medicine.quantity}</td>
                  <td className="p-4">${medicine.price.toFixed(2)}</td>
                  <td className="p-4">{medicine.expiry}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`p-2 px-4 rounded-lg ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 px-4 rounded-lg ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Medicines;
