import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import user from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            picturePath,
            occupation,
            city,
            role,
            partnerId,
            partnerName,
            rewrite
        } = req.body;

        if (!email && !phoneNumber)
            return res.status(500).json({ error: "Email or phone number is required" });

        const corUser = (email) ?await  User.findOne({email: email}):await  User.findOne({phoneNumber: phoneNumber});

        if(corUser && rewrite)
            await User.deleteOne(corUser);
        else if(corUser && !rewrite)
            return res.status(400).json({ error: `User already exists with email: ${email} or/and phone number: ${phoneNumber}`});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: passwordHash,
            picturePath,
            occupation,
            city,
            role,
            partnerId,
            partnerName,
            rewrite
        });
        const savedUser = await newUser.save();

        delete savedUser.password;
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({
            $or: [
                {email: login},
                {phoneNumber: login}
            ]});

        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};