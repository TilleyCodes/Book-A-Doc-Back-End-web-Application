const mongoose = require('mongoose')
const { PatientsModel } = require('../models/patientsModel')

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

// Function to connect to DB and seed data
async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        console.log('Database connected')

        // Clear existing data
        await PatientsModel.deleteMany({})
        console.log('Existing data cleared')

        // Insert new data
        await PatientsModel.insertMany(patientsData)
        console.log('Data seeded successfully')

        // Close the connection
        await mongoose.connection.close()
        console.log('Database disconnected')

    } catch (error) {
        console.log('Error seeding database: ', error)
    }
}

seedDatabase()