// Mongoose schemas and models for telemedicine
import mongoose from "mongoose";

// Patients schema and model
const patientSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: Boolean, default: true, required: true },
    image: { type: String },
    role: { type: String, default: 'user', required: true },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

// Admins schema and model
const adminSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true, required: true },
    role: { type: String, default: 'admin', required: true },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

// Doctors schema and model
const doctorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true, required: true },
    role: { type: String, default: 'doctor', required: true },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

// Profile schema and model
const profileSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, default: '', required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

// Medicines schema and model
const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    brand: { type: String, default: 'Generic' },
    dosage_form: { type: String, required: true },
    quantity_in_stock: { type: Number, default: 0, required: true },
    price_per_unit: { type: Number, required: true },
    expiration_date: { type: Date },
    supplier: { type: String, default: '' },
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);

// Prescriptions schema and model
const prescriptionSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    prescription_date: { type: Date, default: Date.now, required: true },
    diagnosis: { type: String, required: true },
    dosage: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active', required: true },
    notes: { type: String, default: '' },
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Appointments schema and model
const appointmentSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_date: { type: Date, required: true },
    appointment_time: { type: String, required: true },
    status: { type: String, enum: ['active', 'scheduled', 'cancelled', 'completed'], default: 'active', required: true },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Notifications schema and model
const notificationSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    notification_type: { type: String, default: 'message', required: true },
    content: { type: String, required: true },
    status: { type: String, default: 'unread', required: true },
    is_seen: { type: Boolean, default: false, required: true },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);


export { 
    Patient,
    Admin,
    Doctor,
    Profile,
    Medicine,
    Prescription,
    Appointment,
    Notification } 
