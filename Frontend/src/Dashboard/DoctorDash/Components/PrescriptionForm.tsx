import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PrescriptionForm() {
  const [formData, setFormData] = useState({
    doctor_id: '',
    patient_id: '',
    diagnosis: '',
    dosage: '',
    quantity: '',
    status: 'active',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescription, setPrescription] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // socket
    const currentObj = { [name]: value };
    setPrescription((prev) => ({ ...prev, ...currentObj }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent duplicate submissions
    setIsSubmitting(true);

    try {
      // Initialize WebSocket inside the submit handler to ensure it only emits after the form is filled
      const socket = io("http://localhost:8000");

      // Emit the data
      socket.emit('prescriptions', prescription);

      // Success message on successful submission
      toast.success("Prescription submitted successfully!");

      setFormData({
        doctor_id: '',
        patient_id: '',
        diagnosis: '',
        dosage: '',
        quantity: '',
        status: 'active',
        notes: '',
      });
      // closeModal();
      
      // Disconnect the socket after submission
      // socket.disconnect();

    } catch (error) {
      toast.error('Error submitting prescription details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <><ToastContainer />
    <div className="flex items-center justify-center relative">
    <span 
        className="absolute top-4 left-4 z-10 p-2 bg-blue-600 h-8 w-8 rounded text-white transition duration-200 cursor-pointer" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </span>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl transform transition-transform duration-500 ease-in-out animate-slide-up">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Prescription</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Doctor ID</label>
            <input
              type="number"
              name="doctor_id"
              value={formData.doctor_id}
              placeholder="Doctor ID..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              value={formData.patient_id}
              placeholder="Patient ID..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              placeholder="Diagnosis..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              placeholder="Dosage..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              placeholder="Quantity..."
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              placeholder="Additional notes..."
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
              {isSubmitting ? 'Submitting...' : 'Add Prescription'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default PrescriptionForm;
