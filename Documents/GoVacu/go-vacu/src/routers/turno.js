const express = require('express');
const router = new express.Router;
const auth = require('../middleware/auth');
const Turno = require('../models/Turno');

// TURNOS HANDLERS
router.post('/turnos', auth, async (req, res) => {
    const turno = new Turno({
        ...req.body,
        owner: req.user._id,
    }); 

    try {
        await turno.save();
        res.status(201).send(turno);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/turnos', auth, async (req, res) => {
    try {
        const turnos = await Turno.find({ owner: req.user._id });
        res.status(200).send(turnos);
    } catch (error) {
        res.status(500).send()
    }
});

router.get('/turnos/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const turno = await Turno.findOne({ _id, owner: req.user._id });
        if (!turno) {
            return res.status(404).send();
        }
        res.status(200).send(turno);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/turnos/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date', 'time'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'});
    }

    try {
        const turno = await Turno.findById({_id: req.params.id, owner: req.user._id});

        if (!turno) {
            return res.status(404).send();
        }

        updates.forEach(update => turno[update] = req.body[update]);
        await turno.save();
        res.send(turno);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

router.delete('/turnos/:id', auth, async (req, res) => {
    try {
        const turno = await Turno.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!turno) {
            res.status(404).send();
        }
        res.send(turno);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;