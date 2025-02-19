const mongoose = require('mongoose')
const { PatientsModel } = require('../models/patientsModel')
const { AvailabilitiesModel } = require('../models/availabilityModel')
const { MedicalCentresModel } = require('../models/medicalCentresModel')
const { SpecialtiesModel } = require('../models/specialtiesModel')
const { DoctorsModel } = require('../models/doctorsModel')
const { DoctorCentresModel } = require('../models/doctorCentressModel')
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
        address: {
            street: '1 Victoria Road',
            city: 'Melbourne, Australia',
        }, 
        contacts: {
            email: 'worldsquaremc@email.com', 
            phone: '+61 39735 8466'
        }
    },
    {
        medical_centre_name: 'Coogee Medical Centre',
        operating_hours: '8am - 5pm',
        address: {
            street: '2 Coogee Bay Road',
            city: 'Sydney, Australia',
        },
        contacts: {
            email: 'coogeemc@email.com', 
            phone: '+61 29671 5382'
        }
    },
    {
        medical_centre_name: 'Sunshine Medical Centre',
        operating_hours: '7am - 6pm',
        address: {
            street: '3 Sunny Street', 
            city: 'Brisbane, Australia',
        },
        contacts: {
            email: 'sunshinemc@email.com', 
            phone: '07 8224 6953'
        }
    },
    {
        medical_centre_name: 'ATC Medical Centre',
        operating_hours: '8am - 6pm',
        address: {
            street: '4 Capital Lane',
            city: 'Canberra, Australia',
        },
        contacts: {
            email: 'atcmc@email.com',
            phone: '02 8442 6754'
        }
    },
    {
        medical_centre_name: 'Glenelg Medical Centre',
        operating_hours: '8am - 6pm',
        address: {
            street: '5 Glenelg Beach Road',
            city: 'Adelaide, Australia',
        },
        contacts: {
            email: 'glenelgmc@email.com',
            phone: '+61 88466 3222'
        }
    },
    {
        medical_centre_name: 'Bondi Junction Medical Centre',
        operating_hours: '9am - 7pm',
        address: {
            street: '6 Junction Street',
            city: 'Sydney, Australia',
        },
        contacts: {
            email: 'bondijunctionmc@email.com',
            phone: '02 9670 2003'
        }
    },
]

const specialtiesData = [
    {
        specialty_name: "GP Women's Health",
        description: "Specialised care in women's health including reproductive health, pregnancy care, and menopause management."
    },
    {
        specialty_name: "GP Men's Health",
        description: "Focused on male-specific health issues including prostate health and testosterone management."
    },
    {
        specialty_name: "GP Skin Checks",
        description: "Comprehensive skin examinations and early detection of skin cancers."
    },
    {
        specialty_name: "GP Baby & Child Health",
        description: "Specialised care for infants and children including vaccinations and developmental assessments."
    },
    {
        specialty_name: "GP Mental Health",
        description: "Support for anxiety, depression, and other mental health concerns."
    },
    {
        specialty_name: "GP Chronic Disease Management",
        description: "Management of ongoing conditions like diabetes, heart disease, and asthma."
    }
];

const bookingsData = []

// Function to connect to DB and seed data
async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        console.log('Database connected')

        // Clear existing data
        await PatientsModel.deleteMany({})
        await AvailabilitiesModel.deleteMany({})
        await MedicalCentreModel.deleteMany({})
        await SpecialtyModel.deleteMany({})
        await DoctorModel.deleteMany({})
        await DoctorCentreModel.deleteMany({})
        await BookingsModel.deleteMany({})
        console.log('Existing data cleared')

        // Insert new data
        const insertedPatients = await PatientsModel.insertMany(patientsData)
        const insertedAvailabilities = await AvailabilitiesModel.insertMany(availabilitiesData)
        const insertedMedicalCentres = await MedicalCentreModel.insertMany(medicalCentresData)
        const insertedSpecialties = await SpecialtyModel.insertMany(specialtiesData)
        const insertedDoctors = await DoctorModel.insertMany(doctorsData)
        console.log('Primary data seeded successfully')

        const doctorsData = [
            {
                dr_name: 'Pepe Poo',
                specialty_id: insertedSpecialties[0]._id,
            },
            {
                dr_name: 'Bandit Boy',
                specialty_id: insertedSpecialties[1]._id,
            },
            {
                dr_name: 'Yogi Bear',
                specialty_id: insertedSpecialties[2]._id,
            },
            {
                dr_name: 'Mia Moo',
                specialty_id: insertedSpecialties[3]._id,
            },
            {
                dr_name: 'Ella Bell',
                specialty_id: insertedSpecialties[4]._id,
            },
            {
                dr_name: 'Frank Fudge',
                specialty_id: insertedSpecialties[5]._id,
            },
            {
                dr_name: 'Coco Nut',
                specialty_id: insertedSpecialties[2]._id,
            },
            {
                dr_name: 'Snowy Ball',
                specialty_id: insertedSpecialties[4]._id,
            },
        ]

        const doctorCentresData = [
            {
                doctor_id: insertedDoctors[0]._id,
                medical_centre_id: insertedMedicalCentres[0]._id,
            },
            {
                doctor_id: insertedDoctors[1]._id,
                medical_centre_id: insertedMedicalCentres[1]._id,
            },
            {
                doctor_id: insertedDoctors[2]._id,
                medical_centre_id: insertedMedicalCentres[2]._id,
            },
            {
                doctor_id: insertedDoctors[3]._id,
                medical_centre_id: insertedMedicalCentres[3]._id,
            },
            {
                doctor_id: insertedDoctors[4]._id,
                medical_centre_id: insertedMedicalCentres[14]._id,
            },
            {
                doctor_id: insertedDoctors[5]._id,
                medical_centre_id: insertedMedicalCentres[5]._id,
            },
            {
                doctor_id: insertedDoctors[6]._id,
                medical_centre_id: insertedMedicalCentres[1]._id,
            },
            {
                doctor_id: insertedDoctors[7]._id,
                medical_centre_id: insertedMedicalCentres[2]._id
            }
        ]

        const bookingsData = [
            {
              status: 'pending',
              patient_id: insertedPatients[0]._id,
              doctor_id: insertedDoctors[7]._id, 
              availability_id: insertedAvailabilities[0]._id,
            },
            {
              status: 'confirmed',
              patient_id: insertedPatients[1]._id,
              doctor_id: insertedDoctors[6]._id,
              availability_id: insertedAvailabilities[1]._id,
            },
            {
              status: 'cancelled',
              patient_id: insertedPatients[2]._id,
              doctor_id: insertedDoctors[5]._id,
              availability_id: insertedAvailabilities[2]._id,
            },
            {
              status: 'confirmed',
              patient_id: insertedPatients[3]._id,
              doctor_id: insertedDoctors[4]._id,
              availability_id: insertedAvailabilities[3]._id,
            },
            {
              status: 'pending',
              patient_id: insertedPatients[4]._id,
              doctor_id: insertedDoctors[3]._id,
              availability_id: insertedAvailabilities[4]._id,
            },
          ]

          const doctorAvailabilityData = [
            {
                availability_id: insertedAvailabilities[0]._id,
                doctor_id: insertedDoctors[0]._id,
            },
            {
                availability_id: insertedAvailabilities[1]._id,
                doctor_id: insertedDoctors[1]._id,
            },
            {
                availability_id: insertedAvailabilities[2]._id,
                doctor_id: insertedDoctors[2]._id,
            },
            {
                availability_id: insertedAvailabilities[3]._id,
                doctor_id: insertedDoctors[3]._id,
            },
            {
                availability_id: insertedAvailabilities[4]._id,
                doctor_id: insertedDoctors[4]._id,
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
        console.log('Error seeding database: ', error.message);
        // Ensure the connection is closed even if there's an error
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }
}


seedDatabase()