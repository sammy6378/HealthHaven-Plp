import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function MedicineForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: 'Generic',
    dosage_form: '',
    quantity_in_stock: '',
    price_per_unit: '',
    expiration_date: '',
    supplier: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent duplicate submissions
    setIsSubmitting(true);

    try {
      // Make API call to submit data (mocked here)
      // Example: await api.post('/medicines', formData);

      toast.success('Medicine details submitted successfully!');
      setFormData({
        name: '',
        description: '',
        brand: 'Generic',
        dosage_form: '',
        quantity_in_stock: '',
        price_per_unit: '',
        expiration_date: '',
        supplier: '',
      });
      // closeModal();
    } catch (error) {
      toast.error('Error submitting medicine details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex-1 flex justify-center items-start relative">
      <span 
        className="absolute top-4 left-4 z-10 p-2 bg-blue-600 h-8 w-8 rounded text-white transition duration-200 cursor-pointer" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </span>
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl transform transition-transform duration-500 ease-in-out animate-slide-up">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Medicine</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              placeholder="Brand..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Dosage Form</label>
            <input
              type="text"
              name="dosage_form"
              value={formData.dosage_form}
              placeholder="Dosage Form..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity in Stock</label>
            <input
              type="number"
              name="quantity_in_stock"
              value={formData.quantity_in_stock}
              placeholder="Quantity in Stock..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Price per Unit</label>
            <input
              type="number"
              step="0.01"
              name="price_per_unit"
              value={formData.price_per_unit}
              placeholder="Price per Unit..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Expiration Date</label>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              placeholder="Supplier..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="sm:col-span-2 flex justify-between mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white p-3 rounded mr-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Add Medicine'}
            </button>
            {/* <button
              type="button"
              // onClick={closeModal}
              className="w-full sm:w-auto bg-gray-400 text-white p-3 rounded mt-2 sm:mt-0"
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default MedicineForm;
