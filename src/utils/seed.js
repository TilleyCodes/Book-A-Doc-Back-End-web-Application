const mongoose = require('mongoose');
const Patient = require('../models/patient');
const Availability = require('../models/availability');
const MedicalCentre = require('../models/medicalCentre');
const Specialty = require('../models/specialty');
const Doctor = require('../models/doctor');
const DoctorCentre = require('../models/doctorCentre');
const Booking = require('../models/booking');
const DoctorAvailability = require('../models/doctorAvailability');

// Sample data to be seeded
const patientsData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: new Date('1990-01-01'),
    address: {
      street: '123 Main St',
      city: 'Anytown',
    },
    phoneNumber: '0400 928 882',
    password: 'password123',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: new Date('1985-05-15'),
    address: {
      street: '456 Elm St',
      city: 'Othertown',
    },
    phoneNumber: '0433 393 203',
    password: 'password456',
  },
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@example.com',
    dateOfBirth: new Date('1988-07-22'),
    address: {
      street: '789 George St',
      city: 'Sydney',
    },
    phoneNumber: '0412 345 678',
    password: 'emilyj1234',
  },
  {
    firstName: 'Liam',
    lastName: 'Brown',
    email: 'liam.brown@example.com',
    dateOfBirth: new Date('1995-03-14'),
    address: {
      street: '456 Collins St',
      city: 'Melbourne',
    },
    phoneNumber: '0401 234 567',
    password: 'liambrown456',
  },
  {
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia.davis@example.com',
    dateOfBirth: new Date('1992-11-05'),
    address: {
      street: '123 Queen St',
      city: 'Brisbane',
    },
    phoneNumber: '0423 456 789',
    password: 'olivia78910',
  },
];

const availabilitiesData = [
  {
    date: new Date('2025-02-24'),
    startTime: '09:00',
    endTime: '10:00',
    isBooked: false,
  },
  {
    date: new Date('2025-02-24'),
    startTime: '10:00',
    endTime: '11:00',
    isBooked: true,
  },
  {
    date: new Date('2025-02-25'),
    startTime: '14:00',
    endTime: '15:00',
    isBooked: false,
  },
  {
    date: new Date('2025-02-26'),
    startTime: '11:00',
    endTime: '12:00',
    isBooked: false,
  },
  {
    date: new Date('2025-02-27'),
    startTime: '16:00',
    endTime: '17:00',
    isBooked: true,
  },
];

// Sample medical centre data to be seeded
const medicalCentresData = [
  {
    medicalCentreName: 'World Square Medical Centre',
    operatingHours: '8am - 6pm',
    address: {
      street: '1 Victoria Road',
      city: 'Melbourne',
    },
    contacts: {
      email: 'worldsquaremc@email.com',
      phone: '+61 39735 8466',
    },
  },
  {
    medicalCentreName: 'Coogee Medical Centre',
    operatingHours: '8am - 5pm',
    address: {
      street: '2 Coogee Bay Road',
      city: 'Sydney',
    },
    contacts: {
      email: 'coogeemc@email.com',
      phone: '+61 29671 5382',
    },
  },
  {
    medicalCentreName: 'Sunshine Medical Centre',
    operatingHours: '7am - 6pm',
    address: {
      street: '3 Sunny Street',
      city: 'Brisbane',
    },
    contacts: {
      email: 'sunshinemc@email.com',
      phone: '07 8224 6953',
    },
  },
  {
    medicalCentreName: 'ATC Medical Centre',
    operatingHours: '8am - 6pm',
    address: {
      street: '4 Capital Lane',
      city: 'Canberra',
    },
    contacts: {
      email: 'atcmc@email.com',
      phone: '02 8442 6754',
    },
  },
  {
    medicalCentreName: 'Glenelg Medical Centre',
    operatingHours: '8am - 6pm',
    address: {
      street: '5 Glenelg Beach Road',
      city: 'Adelaide',
    },
    contacts: {
      email: 'glenelgmc@email.com',
      phone: '+61 88466 3222',
    },
  },
  {
    medicalCentreName: 'Bondi Junction Medical Centre',
    operatingHours: '9am - 7pm',
    address: {
      street: '6 Junction Street',
      city: 'Sydney',
    },
    contacts: {
      email: 'bondijunctionmc@email.com',
      phone: '02 9670 2003',
    },
  },
];

const specialtiesData = [
  {
    specialtyName: 'GP Women\'s Health',
    description: "Specialised care in women's health including reproductive health, pregnancy care, and menopause management.",
  },
  {
    specialtyName: 'GP Men\'s Health',
    description: 'Focused on male-specific health issues including prostate health and testosterone management.',
  },
  {
    specialtyName: 'GP Skin Checks',
    description: 'Comprehensive skin examinations and early detection of skin cancers.',
  },
  {
    specialtyName: 'GP Baby & Child Health',
    description: 'Specialised care for infants and children including vaccinations and developmental assessments.',
  },
  {
    specialtyName: 'GP Mental Health',
    description: 'Support for anxiety, depression, and other mental health concerns.',
  },
  {
    specialtyName: 'GP Chronic Disease Management',
    description: 'Management of ongoing conditions like diabetes, heart disease, and asthma.',
  },
];

// Function to connect to DB and seed data
async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');

    console.log('Database connected');

    // Clear existing data
    await Patient.deleteMany({});
    await Availability.deleteMany({});
    await MedicalCentre.deleteMany({});
    await Specialty.deleteMany({});
    await Doctor.deleteMany({});
    await DoctorCentre.deleteMany({});
    await Booking.deleteMany({});
    await DoctorAvailability.deleteMany({});
    console.log('Existing data cleared');

    // Create patients using the model to trigger middleware
    const insertedPatients = await Promise.all(
      patientsData.map((patientData) => {
        const patient = new Patient(patientData);
        return patient.save();
      }),
    );
    console.log('Patients seeded with hashed passwords');

    // Insert new data
    const insertedAvailabilities = await Availability.insertMany(availabilitiesData);
    const insertedMedicalCentres = await MedicalCentre.insertMany(medicalCentresData);
    const insertedSpecialties = await Specialty.insertMany(specialtiesData);
    console.log('Primary data seeded successfully');

    const doctorsData = [
      {
        doctorName: 'Pepe Poo',
        specialtyId: insertedSpecialties[0].id,
      },
      {
        doctorName: 'Bandit Boy',
        specialtyId: insertedSpecialties[1].id,
      },
      {
        doctorName: 'Yogi Bear',
        specialtyId: insertedSpecialties[2].id,
      },
      {
        doctorName: 'Mia Moo',
        specialtyId: insertedSpecialties[3].id,
      },
      {
        doctorName: 'Ella Bell',
        specialtyId: insertedSpecialties[4].id,
      },
      {
        doctorName: 'Frank Fudge',
        specialtyId: insertedSpecialties[5].id,
      },
      {
        doctorName: 'Coco Nut',
        specialtyId: insertedSpecialties[2].id,
      },
      {
        doctorName: 'Snowy Ball',
        specialtyId: insertedSpecialties[4].id,
      },
    ];

    // Populate insertedDoctors
    const insertedDoctors = await Doctor.insertMany(doctorsData);

    const doctorCentresData = [
      {
        doctorId: insertedDoctors[0].id,
        medicalCentreId: insertedMedicalCentres[0].id,
      },
      {
        doctorId: insertedDoctors[1].id,
        medicalCentreId: insertedMedicalCentres[1].id,
      },
      {
        doctorId: insertedDoctors[2].id,
        medicalCentreId: insertedMedicalCentres[2].id,
      },
      {
        doctorId: insertedDoctors[3].id,
        medicalCentreId: insertedMedicalCentres[3].id,
      },
      {
        doctorId: insertedDoctors[4].id,
        medicalCentreId: insertedMedicalCentres[1].id,
      },
      {
        doctorId: insertedDoctors[5].id,
        medicalCentreId: insertedMedicalCentres[5].id,
      },
      {
        doctorId: insertedDoctors[6].id,
        medicalCentreId: insertedMedicalCentres[1].id,
      },
      {
        doctorId: insertedDoctors[7].id,
        medicalCentreId: insertedMedicalCentres[2].id,
      },
    ];

    const bookingsData = [
      {
        status: 'confirmed',
        patientId: insertedPatients[0].id,
        doctorId: insertedDoctors[7].id,
        availabilityId: insertedAvailabilities[0].id,
      },
      {
        status: 'confirmed',
        patientId: insertedPatients[1].id,
        doctorId: insertedDoctors[6].id,
        availabilityId: insertedAvailabilities[1].id,
      },
      {
        status: 'cancelled',
        patientId: insertedPatients[2].id,
        doctorId: insertedDoctors[5].id,
        availabilityId: insertedAvailabilities[2].id,
      },
      {
        status: 'confirmed',
        patientId: insertedDoctors[4].id,
        availabilityId: insertedAvailabilities[3].id,
      },
      {
        status: 'confirmed',
        patientId: insertedPatients[4].id,
        doctorId: insertedDoctors[3].id,
        availabilityId: insertedAvailabilities[4].id,
      },
    ];

    const doctorAvailabilityData = [
      {
        availabilityId: insertedAvailabilities[0].id,
        doctorId: insertedDoctors[0].id,
      },
      {
        availabilityId: insertedAvailabilities[1].id,
        doctorId: insertedDoctors[1].id,
      },
      {
        availabilityId: insertedAvailabilities[2].id,
        doctorId: insertedDoctors[2].id,
      },
      {
        availabilityId: insertedAvailabilities[3].id,
        doctorId: insertedDoctors[3].id,
      },
      {
        availabilityId: insertedAvailabilities[4].id,
        doctorId: insertedDoctors[4].id,
      },
    ];

    // Insert bookingData
    await DoctorCentre.insertMany(doctorCentresData);
    await Booking.insertMany(bookingsData);
    await DoctorAvailability.insertMany(doctorAvailabilityData);
    console.log('Database seeded successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('Database disconnected');
  } catch (error) {
    console.log('Error seeding database: ', error.message);
    // Ensure the connection is closed even if there's an error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

seedDatabase();
