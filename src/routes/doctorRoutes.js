const express = require("express");
const {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctorController");

const doctorRouter = express.Router();

// GET all doctors - http://localhost:3000/doctors
doctorRouter.get("/", async (req, res) => {
    const doctors = await getDoctors();
    res.json(doctors);
});

// GET a single doctor - http://localhost:3000/doctors/_id
doctorRouter.get("/:doctorId", async (req, res) => {
    const doctor = await getDoctor(req.params.doctorId);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
    }
});

// POST new doctor - http://localhost:3000/doctors
doctorRouter.post("/", async (req, res) => {
    const bodyData = {
        doctorName: req.body.doctorName,
        operatingHours: req.body.operatingHours,
        address: {
            street: req.body.address.street,
            city: req.body.address.city
        },
        contacts: {
            email: req.body.contacts.email,
            phone: req.body.contacts.phone
        }
    };
    const newDoctor = await createDoctor(bodyData);
    res.status(201).json(newDoctor);
});

// PATCH update doctor - http://localhost:3000/doctors/_id
doctorRouter.patch("/:doctorId", async (req, res) => {
    const bodyData = {
        doctorName: req.body.doctorName,
        operatingHours: req.body.operatingHours,
        address: {
            street: req.body.address.street,
            city: req.body.address.city
        },
        contacts: {
            email: req.body.contacts.email,
            phone: req.body.contacts.phone
        }
    };
    const updatedDoctor = await updateDoctor(req.params.DoctorId, bodyData);
    if (!updatedDoctor) {
        res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
    } else if (updatedDoctor.error) {
        res.status(403).json(updatedDoctor)
    } else {
        res.json(updatedDoctor);
    }
});

// DELETE doctor - http://localhost:3000/doctors/_id
doctorRouter.delete("/:doctorId", async (req, res) => {
    const deletedDoctor = await deleteDoctor(req.params.doctorId);
    if (deletedDoctor) {
        res.json(deletedDoctor);
    } else {
        res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
    }
});

module.exports = doctorRouter;