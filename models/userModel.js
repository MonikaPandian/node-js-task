const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is required"]
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"]
    },
    dob: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        unique: true
    },
    occupation: {
        type: String,
    },
    company: {
        type: String,
    }
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;