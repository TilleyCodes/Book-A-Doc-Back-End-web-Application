const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Availability = require('../models/availability')
const MedicalCentre = require('../models/medicalCentre')
const Specialty = require('../models/specialty')
const Doctor = require('../models/doctor')
const DoctorCentre = require('../models/doctorCentre')
const Booking = require('../models/booking')
const DoctorAvailability = require('../models/doctorAvailability')

// Sample data to be seeded
const patientsData = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'),
        address: {
            street: '123 Main St', 
            city: 'Anytown'
        },
        phone_number: '0400 928 882',
        password: 'password123'
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        dateOfBirth: new Date('1985-05-15'),
        address: {
            street: '456 Elm St', 
            city: 'Othertown'
        },
        phone_number: '0433 393 203',
        password: 'password456'
    },
    {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily.johnson@example.com',
        dateOfBirth: new Date('1988-07-22'),
        address: {
            street: '789 George St',
            city: 'Sydney'
        },
        phone_number: '0412 345 678',
        password: 'emilyj1234'
    },
    {
        firstName: 'Liam',
        lastName: 'Brown',
        email: 'liam.brown@example.com',
        dateOfBirth: new Date('1995-03-14'),
        address: {
            street: '456 Collins St', 
            city: 'Melbourne'
        },
        phone_number: '0401 234 567',
        password: 'liambrown456'
    },
    {
        firstName: 'Olivia',
        lastName: 'Davis',
        email: 'olivia.davis@example.com',
        dateOfBirth: new Date('1992-11-05'),
        address: {
            street: '123 Queen St', 
            city: 'Brisbane'
        },
        phone_number: '0423 456 789',
        password: 'olivia78910'
    }
]

const availabilitiesData = [
    {
        date: new Date('2025-02-24'), 
        startTime: '09:00',
        endTime: '10:00',
        isBooked: false
    },
    {
        date: new Date('2025-02-24'), 
        startTime: '10:00',
        endTime: '11:00',
        isBooked: true
    },
    {
        date: new Date('2025-02-25'), 
        startTime: '14:00',
        endTime: '15:00',
        isBooked: false
    },
    {
        date: new Date('2025-02-26'), 
        startTime: '11:00',
        endTime: '12:00',
        isBooked: false
    },
    {
        date: new Date('2025-02-27'), 
        startTime: '16:00',
        endTime: '17:00',
        isBooked: true
    }
]

// Sample medical centre data to be seeded
const medicalCentresData = [
    {
        medicalCentreName: 'World Square Medical Centre',
        operatingHours: '8am - 6pm',
        address: {
            street: '1 Victoria Road',
            city: 'Melbourne'
        }, 
        contacts: {
            email: 'worldsquaremc@email.com', 
            phone: '+61 39735 8466'
        }
    },
    {
        medicalCentreName: 'Coogee Medical Centre',
        operatingHours: '8am - 5pm',
        address: {
            street: '2 Coogee Bay Road',
            city: 'Sydney'
        },
        contacts: {
            email: 'coogeemc@email.com', 
            phone: '+61 29671 5382'
        }
    },
    {
        medicalCentreName: 'Sunshine Medical Centre',
        operatingHours: '7am - 6pm',
        address: {
            street: '3 Sunny Street', 
            city: 'Brisbane'
        },
        contacts: {
            email: 'sunshinemc@email.com', 
            phone: '07 8224 6953'
        }
    },
    {
        medicalCentreName: 'ATC Medical Centre',
        operatingHours: '8am - 6pm',
        address: {
            street: '4 Capital Lane',
            city: 'Canberra'
        },
        contacts: {
            email: 'atcmc@email.com',
            phone: '02 8442 6754'
        }
    },
    {
        medicalCentreName: 'Glenelg Medical Centre',
        operatingHours: '8am - 6pm',
        address: {
            street: '5 Glenelg Beach Road',
            city: 'Adelaide'
        },
        contacts: {
            email: 'glenelgmc@email.com',
            phone: '+61 88466 3222'
        }
    },
    {
        medicalCentreName: 'Bondi Junction Medical Centre',
        operatingHours: '9am - 7pm',
        address: {
            street: '6 Junction Street',
            city: 'Sydney'
        },
        contacts: {
            email: 'bondijunctionmc@email.com',
            phone: '02 9670 2003'
        }
    },
]

const specialtiesData = [
    {
        specialtyName: "GP Women's Health",
        description: "Specialised care in women's health including reproductive health, pregnancy care, and menopause management."
    },
    {
        specialtyName: "GP Men's Health",
        description: "Focused on male-specific health issues including prostate health and testosterone management."
    },
    {
        specialtyName: "GP Skin Checks",
        description: "Comprehensive skin examinations and early detection of skin cancers."
    },
    {
        specialtyName: "GP Baby & Child Health",
        description: "Specialised care for infants and children including vaccinations and developmental assessments."
    },
    {
        specialtyName: "GP Mental Health",
        description: "Support for anxiety, depression, and other mental health concerns."
    },
    {
        specialtyName: "GP Chronic Disease Management",
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
        await Patient.deleteMany({})
        await Availability.deleteMany({})
        await MedicalCentre.deleteMany({})
        await Specialty.deleteMany({})
        await Doctor.deleteMany({})
        await DoctorCentre.deleteMany({})
        await Booking.deleteMany({})
        console.log('Existing data cleared')

        // Insert new data
        const insertedPatients = await Patient.insertMany(patientsData)
        const insertedAvailabilities = await Availability.insertMany(availabilitiesData)
        const insertedMedicalCentres = await MedicalCentre.insertMany(medicalCentresData)
        const insertedSpecialties = await Specialty.insertMany(specialtiesData)
        const insertedDoctors = await Doctor.insertMany(doctorsData)
        console.log('Primary data seeded successfully')

        const doctorsData = [
            {
                doctorName: 'Pepe Poo',
                specialty_id: insertedSpecialties[0]._id,
            },
            {
                doctorName: 'Bandit Boy',
                specialtyId: insertedSpecialties[1]._id,
            },
            {
                doctorName: 'Yogi Bear',
                specialtyId: insertedSpecialties[2]._id,
            },
            {
                doctorName: 'Mia Moo',
                specialtyId: insertedSpecialties[3]._id,
            },
            {
                doctorName: 'Ella Bell',
                specialtyId: insertedSpecialties[4]._id,
            },
            {
                doctorName: 'Frank Fudge',
                specialtyId: insertedSpecialties[5]._id,
            },
            {
                doctorName: 'Coco Nut',
                specialtyId: insertedSpecialties[2]._id,
            },
            {
                doctorName: 'Snowy Ball',
                specialtyId: insertedSpecialties[4]._id,
            },
        ]

        const doctorCentresData = [
            {
                doctorId: insertedDoctors[0]._id,
                medicalCentreId: insertedMedicalCentres[0]._id,
            },
            {
                doctor_id: insertedDoctors[1]._id,
                medicalCentreId: insertedMedicalCentres[1]._id,
            },
            {
                doctor_id: insertedDoctors[2]._id,
                medicalCentreId: insertedMedicalCentres[2]._id,
            },
            {
                doctor_id: insertedDoctors[3]._id,
                medicalCentreId: insertedMedicalCentres[3]._id,
            },
            {
                doctor_id: insertedDoctors[4]._id,
                medicalCentreId: insertedMedicalCentres[14]._id,
            },
            {
                doctor_id: insertedDoctors[5]._id,
                medicalCentreId: insertedMedicalCentres[5]._id,
            },
            {
                doctor_id: insertedDoctors[6]._id,
                medicalCentreId: insertedMedicalCentres[1]._id,
            },
            {
                doctor_id: insertedDoctors[7]._id,
                medicalCentreId: insertedMedicalCentres[2]._id
            }
        ]

        const bookingsData = [
            {
              status: 'pending',
              patientId: insertedPatients[0]._id,
              doctorId: insertedDoctors[7]._id, 
              availabilityId: insertedAvailabilities[0]._id,
            },
            {
              status: 'confirmed',
              patientId: insertedPatients[1]._id,
              doctorId: insertedDoctors[6]._id,
              availabilityId: insertedAvailabilities[1]._id,
            },
            {
              status: 'cancelled',
              patientId: insertedPatients[2]._id,
              doctorId: insertedDoctors[5]._id,
              availabilityId: insertedAvailabilities[2]._id,
            },
            {
              status: 'confirmed',
              patientId: insertedDoctors[4]._id,
              availabilityId: insertedAvailabilities[3]._id,
            },
            {
              status: 'pending',
              patientId: insertedPatients[4]._id,
              doctorId: insertedDoctors[3]._id,
              availabilityId: insertedAvailabilities[4]._id,
            },
          ]

          const doctorAvailabilityData = [
            {
                availabilityId: insertedAvailabilities[0]._id,
                doctorId: insertedDoctors[0]._id,
            },
            {
                availabilityId: insertedAvailabilities[1]._id,
                doctorId: insertedDoctors[1]._id,
            },
            {
                availabilityId: insertedAvailabilities[2]._id,
                doctorId: insertedDoctors[2]._id,
            },
            {
                availabilityId: insertedAvailabilities[3]._id,
                doctorId: insertedDoctors[3]._id,
            },
            {
                availabilityId: insertedAvailabilities[4]._id,
                doctorId: insertedDoctors[4]._id,
            },
          ]

        // Insert bookingData
        await Booking.insertMany(bookingsData)
        await DoctorAvailability.insertMany(doctorAvailabilityData)
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