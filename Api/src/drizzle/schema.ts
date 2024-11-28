import { varchar,pgTable,serial,date,integer,time, pgEnum,timestamp,numeric,boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

// telemedicine tables

// patients table
export const patients = pgTable('patients', {
    patient_id: serial('patient_id').notNull().primaryKey(),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    phone: varchar('phone').notNull(),
    status: boolean('status').default(true).notNull(),
    image: varchar('image'),
    role: varchar('role').default('user').notNull(),
  });

  //   admin table
export const admins = pgTable('admins', {
  admin_id: serial('admin_id').notNull().primaryKey(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  status: boolean('status').default(true).notNull(),
  role: varchar('role').default('admin').notNull(),
});

//   doctors table
export const doctors = pgTable('doctors', {
  doctor_id: serial('doctor_id').notNull().primaryKey(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  password: varchar('password').notNull(),
  specialization: varchar('specialization').notNull(),
  email: varchar('email').notNull().unique(),
  phone: varchar('phone').notNull(),
  image: varchar('image').notNull(),
  status: boolean('status').default(true).notNull(),
  role: varchar('role').default('doctor').notNull(), 
});


  // profile table
export const profile = pgTable('profile', {
  profile_id: serial('profile_id').notNull().primaryKey(),
  patient_id: integer('user_id').notNull().references(() => patients.patient_id,{onDelete:"cascade"}),
  age: integer('age').notNull(),
  gender: varchar('gender').notNull(),
  address: varchar('address').default('').notNull(),
  image: varchar('image').notNull(),
  created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
  updated_at: timestamp('update_at').default(sql`NOW()`).notNull()
});


// pharmacy data
// medicines table
export const medicines = pgTable('medicines', {
  medicine_id: serial('medicine_id').notNull().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').default(''),
  brand: varchar('brand').default('Generic'),
  dosage_form: varchar('dosage_form').notNull(), // e.g., tablet, capsule, syrup
  quantity_in_stock: integer('quantity_in_stock').default(0).notNull(),
  price_per_unit: numeric('price_per_unit').notNull(),
  expiration_date: timestamp('expiration_date'),
  supplier: varchar('supplier').default(''),
  created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
  updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});


const PreEnum = pgEnum("status", ['active', 'completed', 'cancelled']);
// prescriptions table
export const prescriptions = pgTable('prescriptions', {
  prescription_id: serial('prescription_id').notNull().primaryKey(),
  doctor_id: integer('doctor_id').notNull().references(() => doctors.doctor_id, { onDelete: 'cascade' }),
  patient_id: integer('patient_id').notNull().references(() => patients.patient_id, { onDelete: 'cascade' }),
  prescription_date: timestamp('prescription_date').default(sql`NOW()`).notNull(),
  diagnosis: varchar('diagnosis').notNull(),
  dosage: varchar('dosage').notNull(),
  quantity: integer('quantity').notNull(),
  status: PreEnum('status').default('active').notNull(),
  notes: varchar('notes').default(''),
  created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
  updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});



export const appointmentEnum = pgEnum("status",[ 'active','scheduled', 'cancelled', 'completed']);

//   appointments table
export const appointments = pgTable('appointments', {
    appointment_id: serial('appointment_id').notNull().primaryKey(),
    patient_id: integer('patient_id').notNull().references(() => patients.patient_id,{onDelete:"cascade"}), 
    doctor_id: integer('doctor_id').notNull().references(() => doctors.doctor_id,{onDelete:"cascade"}), 
    appointment_date: date('appointment_date').notNull(),
    appointment_time: time('appointment_time').notNull(),
    status: appointmentEnum('status').default('active').notNull()
  });
  

// notifications table
export const notificationTable = pgTable('notificationTable', {
  notification_id: serial('notification_id').notNull().primaryKey(),
  patient_id: integer('patient_id').notNull().references(() => patients.patient_id, { onDelete: 'cascade' }),
  notification_type: varchar('notification_type').default('message').notNull(), 
  content: varchar('content').notNull(),
  status: varchar('status').default('unread').notNull(),
  is_seen: boolean('is_seen').default(false).notNull(),
  created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
  updated_at: timestamp('updated_at').default(sql`NOW()`).notNull(),
});


// patients relationships
export const patientRelations = relations(patients, ({ many }) => ({
  appointments: many(appointments),
  prescriptions: many(prescriptions),
  // notifications: many(notifications),
}));

// doctors relationships
export const doctorRelations = relations(doctors, ({ many }) => ({
  appointments: many(appointments),
  prescriptions: many(prescriptions),
}));

// appointments relationships
export const appointmentRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, { fields: [appointments.patient_id], references: [patients.patient_id] }),
  doctor: one(doctors, { fields: [appointments.doctor_id], references: [doctors.doctor_id] }),
}));

// prescriptions relationships
export const prescriptionRelations = relations(prescriptions, ({ one }) => ({
  doctor: one(doctors, { fields: [prescriptions.doctor_id], references: [doctors.doctor_id] }),
  patient: one(patients, { fields: [prescriptions.patient_id], references: [patients.patient_id] }),
}));

// notifications relationships
export const notificationRelations = relations(notificationTable, ({ one }) => ({
  patient: one(patients, { fields: [notificationTable.patient_id], references: [patients.patient_id] }),
}));

// medicines relationships
export const medicineRelations = relations(medicines, ({ many }) => ({
  prescriptions: many(prescriptions), // assuming medicines may be prescribed in multiple prescriptions
}));
