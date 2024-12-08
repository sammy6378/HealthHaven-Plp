import pkg from 'pg';
const { Client } = pkg;
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const migrateData = async () => {
    // Connect to Neon (PostgreSQL)
    const pgClient = new Client({
        connectionString: process.env.NEON_DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    // Connect to MongoDB
    const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_DB as string);
    const mongoDbName = process.env.MONGODB_ATLAS_NAME;

    try {
        // Connect to Neon
        await pgClient.connect();
        console.log("Connected to Neon (PostgreSQL)");

        // Query data from tables
        const patientQuery = "SELECT * FROM patients";
        const doctorQuery = "SELECT * FROM doctors";
        const adminQuery = "SELECT * FROM admins";

        const patients = (await pgClient.query(patientQuery)).rows;
        const doctors = (await pgClient.query(doctorQuery)).rows;
        const admins = (await pgClient.query(adminQuery)).rows;

        console.log(`Fetched ${patients.length} patients, ${doctors.length} doctors, ${admins.length} admins.`);

        // Connect to MongoDB
        await mongoClient.connect();
        const mongoDb = mongoClient.db(mongoDbName);
        console.log("Connected to MongoDB");

        // Insert data into MongoDB collections
        const patientCollection = mongoDb.collection("patients");
        const doctorCollection = mongoDb.collection("doctors");
        const adminCollection = mongoDb.collection("admins");

        if (patients.length) {
            const transformedPatients = patients.map(patient => {
                const { patient_id, ...rest } = patient;  // Destructure to exclude `patient_id`
                return {
                    ...rest,  // Spread all other fields into the document
                };
            });
            await patientCollection.insertMany(transformedPatients);
            console.log(`${patients.length} patients migrated.`);
        }
        
        if (doctors.length) {
            const transformedDoctors = doctors.map(doctor => {
                const { doctor_id, ...rest } = doctor;  // Destructure to exclude `doctor_id`
                return {
                    ...rest,  // Spread all other fields into the document
                };
            });
            await doctorCollection.insertMany(transformedDoctors);
            console.log(`${doctors.length} doctors migrated.`);
        }
        
        if (admins.length) {
            const transformedAdmins = admins.map(admin => {
                const { admin_id, ...rest } = admin;  // Destructure to exclude `admin_id`
                return {
                    ...rest,  // Spread all other fields into the document
                };
            });
            await adminCollection.insertMany(transformedAdmins);
            console.log(`${admins.length} admins migrated.`);
        }
        


        console.log("Data migration completed successfully!");
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        // Close connections
        await pgClient.end();
        await mongoClient.close();
        console.log("Connections closed.");
    }
};

export default migrateData;
