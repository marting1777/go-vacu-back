const express = require('express');
const router = new express.Router;
const Vacuna = require('../models/Vacuna');

// VACUNAS HANDLERS
router.post('/vacunas', async (req, res) => {
    const vacuna = new Vacuna(req.body);

    try {
        await vacuna.save();
        res.status(201).send(vacuna);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/vacunas', async (req, res) => {
    try {
        const vacunas = await Vacuna.find({});
        res.send(vacunas);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/vacunas/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const vacuna = await Vacuna.findById(_id);
        if (!vacuna) {
            return res.status(404).send();
        }
        res.status(200).send(vacuna);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/vacunas/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {
        const vacuna = await Vacuna.findById(req.params.id);
        updates.forEach(update => vacuna[update] = req.body[update]);
        await vacuna.save();
        if (!vacuna) {
            return res.status(404).send();
        }
        res.send(vacuna);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/vacunas/:id', async (req, res) => {
    try {
        const vacuna = await Vacuna.findByIdAndDelete(req.params.id);
        if (!vacuna) {
            return res.status(404).send();
        }
        res.send(vacuna);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;