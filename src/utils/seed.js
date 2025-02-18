const mongoose = require('mongoose')
const { PatientsModel } = require('../models/patientsModel')
const { AvailabilitiesModel } = require('../models/availabilitiesModel')
const { MedicalCentresModel } = require('../models/medicalCentresModel')
const { BookingsModel } = require('../models/bookingsModel')
const { DoctorAvailabilitiesModel } = require('../models/doctorAvailabilitiesModel')

// Sample data to be seeded
const patientsData = [
    {
        fname: 'John',
        lname: 'Doe',
        email: 'john.doe@example.com',
        date_of_birth: new Date('1990-01-01'),
        address: '123 Main St, Anytown, Australia',
        phone_number: '0400 928 882',
        password: 'password123'
    },
    {
        fname: 'Jane',
        lname: 'Smith',
        email: 'jane.smith@example.com',
        date_of_birth: new Date('1985-05-15'),
        address: '456 Elm St, Othertown, Australia',
        phone_number: '0433 393 203',
        password: 'password456'
    },
    {
        fname: 'Emily',
        lname: 'Johnson',
        email: 'emily.johnson@example.com',
        date_of_birth: new Date('1988-07-22'),
        address: '789 George St, Sydney, NSW 2000',
        phone_number: '0412 345 678',
        password: 'emily123'
    },
    {
        fname: 'Liam',
        lname: 'Brown',
        email: 'liam.brown@example.com',
        date_of_birth: new Date('1995-03-14'),
        address: '456 Collins St, Melbourne, VIC 3000',
        phone_number: '0401 234 567',
        password: 'liam456'
    },
    {
        fname: 'Olivia',
        lname: 'Davis',
        email: 'olivia.davis@example.com',
        date_of_birth: new Date('1992-11-05'),
        address: '123 Queen St, Brisbane, QLD 4000',
        phone_number: '0423 456 789',
        password: 'olivia789'
    }
]

const availabilitiesData = [
    {
        date: new Date('2025-02-24'), 
        start_time: '09:00',
        end_time: '10:00',
        is_booked: false
    },
    {
        date: new Date('2025-02-24'), 
        start_time: '10:00',
        end_time: '11:00',
        is_booked: true
    },
    {
        date: new Date('2025-02-25'), 
        start_time: '14:00',
        end_time: '15:00',
        is_booked: false
    },
    {
        date: new Date('2025-02-26'), 
        start_time: '11:00',
        end_time: '12:00',
        is_booked: false
    },
    {
        date: new Date('2025-02-27'), 
        start_time: '16:00',
        end_time: '17:00',
        is_booked: true
    }
]

// Sample medical centre data to be seeded
const medicalCentresData = [
    {
        medical_centre_name: 'World Square Medical Centre',
        operating_hours: '8am - 6pm',
        address: '1 Sydney Road, Melbourne, Australia',
        contacts: {
            email: 'worldsquaremc@email.com', 
            phone: '+61 39735 8466'
        }
    },
    {
        medical_centre_name: 'Coogee Medical Centre',
        operating_hours: '8am - 5pm',
        address: '2 Coogee Bay Road, Sydney, Australia',
        contacts: {
            email: 'coogeemc@email.com', 
            phone: '+61 29671 5382'
        }
    },
    {
        medical_centre_name: 'Sunshine Medical Centre',
        operating_hours: '7am - 6pm',
        address: '3 Sunny Street, Brisbane, Australia',
        contacts: {
            email: 'sunshinemc@email.com', 
            phone: '07 8224 6953'
        }
    },
    {
        medical_centre_name: 'ATC Medical Centre',
        operating_hours: '8am - 6pm',
        address: '4 Capital Lane, Canberra, Australia',
        contacts: {
            email: 'atcmc@email.com',
            phone: '02 8442 6754'
        }
    },
    {
        medical_centre_name: 'Glenelg Medical Centre',
        operating_hours: '8am - 6pm',
        address: '5 Glenelg Beach Road, Adelaide, Australia',
        contacts: {
            email: 'glenelgmc@email.com',
            phone: '+61 88466 3222'
        }
    }
]

const bookingsData = []

// Function to connect to DB and seed data
async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        console.log('Database connected')

        // Clear existing data
        await PatientsModel.deleteMany({})
        await AvailabilitiesModel.deleteMany({})
        await MedicalCentresModel.deleteMany({})
        await BookingsModel.deleteMany({})
        console.log('Existing data cleared')

        // Insert new data
        const insertedPatients = await PatientsModel.insertMany(patientsData)
        const insertedAvailabilities = await AvailabilitiesModel.insertMany(availabilitiesData)
        await MedicalCentresModel.insertMany(medicalCentresData)
        console.log('Primary data seeded successfully')

        const bookingsData = [
            {
              status: 'pending',
              patient_id: insertedPatients[0]._id,
              doctor_id: new mongoose.Types.ObjectId(), // Replace with a valid doctor _id when available
              availability_id: insertedAvailabilities[0]._id,
            },
            {
              status: 'confirmed',
              patient_id: insertedPatients[1]._id,
              doctor_id: new mongoose.Types.ObjectId(),
              availability_id: insertedAvailabilities[1]._id,
            },
            {
              status: 'cancelled',
              patient_id: insertedPatients[2]._id,
              doctor_id: new mongoose.Types.ObjectId(),
              availability_id: insertedAvailabilities[2]._id,
            },
            {
              status: 'confirmed',
              patient_id: insertedPatients[3]._id,
              doctor_id: new mongoose.Types.ObjectId(),
              availability_id: insertedAvailabilities[3]._id,
            },
            {
              status: 'pending',
              patient_id: insertedPatients[4]._id,
              doctor_id: new mongoose.Types.ObjectId(),
              availability_id: insertedAvailabilities[4]._id,
            },
          ]

          const doctorAvailabilityData = [
            {
                availability_id: insertedAvailabilities[0]._id,
                doctor_id: new mongoose.Types.ObjectId(), // Replace with a valid doctor _id when available
            },
            {
                availability_id: insertedAvailabilities[1]._id,
                doctor_id: new mongoose.Types.ObjectId(), 
            },
            {
                availability_id: insertedAvailabilities[2]._id,
                doctor_id: new mongoose.Types.ObjectId(), 
            },
            {
                availability_id: insertedAvailabilities[3]._id,
                doctor_id: new mongoose.Types.ObjectId(), 
            },
            {
                availability_id: insertedAvailabilities[4]._id,
                doctor_id: new mongoose.Types.ObjectId(), 
            },
          ]

        // Insert bookingData
        await BookingsModel.insertMany(bookingsData)
        await DoctorAvailabilitiesModel.insertMany(doctorAvailabilityData)
        console.log('Bookings seeded successfully')

        // Close the connection
        await mongoose.connection.close()
        console.log('Database disconnected')

    } catch (error) {
        console.log('Error seeding database: ', error)
    }
}


seedDatabase()