const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

const registerController = async (req, res) => {
    const { firstName, lastName, middleName, dob, email, password, phone, occupation, company } = req.body;

    try {
        // checking if already the email exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).send("Email already exists");
        }

        const userPhone = await userModel.findOne({ phone });
        if (userPhone) {
            return res.status(409).send("Mobile number already exists");
        }
        // encrypting the password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // creating the user
        const newUser = new userModel({ firstName, middleName, lastName, email, dob, phone, occupation, password: encryptedPassword, company });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        res.status(400).json(error);
    }
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    // checking if already the user exists in database

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).send("Invalid credentials");
            return;
        }
        // verifying whether the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).send("Invalid credentials");
            return;
        }
        // assigning jwt token
        const token = generateToken(user._id);
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, token: token });
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateController = async (req, res) => {
    const { userId } = req.params;
    var encryptedPassword;
    const { firstName, lastName, middleName, email, password, occupation, phone, company } = req.body;

    try {
        // checking if already the user exists in database
        const user = userModel.findById(userId);
        if (!user) {
            return res.status(400).send("User not exists");
        }
        // encrypting the password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            encryptedPassword = await bcrypt.hash(password, salt);
        }
        //updating the user
        await user.updateOne({ $set: { password: encryptedPassword, firstName, lastName, middleName, email, occupation, phone, company } });
        res.status(200).json("User successfully updated");
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteController = async (req, res) => {
    const { userId } = req.params;
    try {
        // checking if already the user exists in database
        const user = userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send("User not exists");
        }
        //deleting the user
        await userModel.findOneAndDelete({ _id: userId });
        res.status(200).json("User deleted successfully");
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { loginController, registerController, updateController, deleteController }
