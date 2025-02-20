const express = require("express");
const {
    getSpecialties,
    getSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty
} = require("../controllers/specialtyController");

const specialtyRouter = express.Router();

// GET all specialties - http://localhost:3000/specialties
specialtyRouter.get("/", async (req, res) => {
    const specialties = await getSpecialties();
    res.json(specialties);
});

// GET a single specialty - http://localhost:3000/specialties/_id
specialtyRouter.get("/:specialtyId", async (req, res) => {
    const specialty = await getSpecialty(req.params.specialtyId);
    if (specialty) {
        res.json(specialty);
    } else {
        res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
    }
});

// POST new specialty - http://localhost:3000/specialties
specialtyRouter.post("/", async (req, res) => {
    const bodyData = {
        specialtyName: req.body.specialtyName,
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
    const newSpecialty = await createSpecialty(bodyData);
    res.status(201).json(newSpecialty);
});

// PATCH update specialty - http://localhost:3000/specialties/_id
specialtyRouter.patch("/:specialtyId", async (req, res) => {
    const bodyData = {
        specialtyName: req.body.specialtyName,
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
    const updatedSpecialty = await updateSpecialty(req.params.SpecialtyId, bodyData);
    if (!updatedSpecialty) {
        res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
    } else if (updatedSpecialty.error) {
        res.status(403).json(updatedSpecialty)
    } else {
        res.json(updatedSpecialty);
    }
});

// DELETE specialty - http://localhost:3000/specialties/_id
specialtyRouter.delete("/:specialtyId", async (req, res) => {
    const deletedSpecialty = await deleteSpecialty(req.params.specialtyId);
    if (deletedSpecialty) {
        res.json(deletedSpecialty);
    } else {
        res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
    }
});

module.exports = specialtyRouter;