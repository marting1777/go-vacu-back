const mongoose = require('mongoose');

const turnoSchema = mongoose.Schema({
    date: { type: String, required: true },
    time: {
        type: String,
        enum: ['9:00', '10:00', '11:00', '12:00', '13:00'],
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    vacuna: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vacuna',
    }
});

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;