const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Turno = require('./Turno');

const userSchema = new mongoose.Schema({
    role: { type: Number, default: 0 },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid!');
            }
        }
    },
    dni: { type: Number, required: true, trim: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String },
    phone: { type: Number, required: true },
    socialSecurityCompany: { type: String, required: true, trim: true },
    socialSecurityPlan: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 8,
        validate: value => {
            if (validator.equals(value, 'password')) {
                throw new Error('Password can\'t contain the word password!');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.virtual('turnos', {
    ref: 'Turno',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'govacuapi');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// Hash plain text before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.role;

    return userObject;
};

userSchema.pre('remove', async function (next) {
    const user = this;
    await Turno.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;