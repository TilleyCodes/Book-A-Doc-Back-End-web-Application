const mongoose = require('mongoose')
const { PatientsModel } = require('../models/patientsModel')
const { AvailabilitiesModel } = require('../models/availabilitiesModel')

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

// Function to connect to DB and seed data
async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        console.log('Database connected')

        // Clear existing data
        await PatientsModel.deleteMany({})
        await AvailabilitiesModel.deleteMany({})
        console.log('Existing data cleared')

        // Insert new data
        await PatientsModel.insertMany(patientsData)
        await AvailabilitiesModel.insertMany(availabilitiesData)
        console.log('Data seeded successfully')

        // Close the connection
        await mongoose.connection.close()
        console.log('Database disconnected')

    } catch (error) {
        console.log('Error seeding database: ', error)
    }
}

seedDatabase()