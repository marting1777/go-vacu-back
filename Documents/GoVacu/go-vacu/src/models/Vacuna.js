const mongoose = require('mongoose');

const Vacuna = mongoose.model('Vacuna', {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    stock: {
        type: Number,
        required: true,
    }
});

module.exports = Vacuna;