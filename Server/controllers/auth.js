import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Users from "../routes/users.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            password,
            firstName,
            lastName,
            login,
            occupation,
            city,
            role,
            partnerId,
            blocked,
            rewrite
        } = req.body;

        const corUser = await  User.findOne({login: login});

        if(corUser && rewrite)
            await User.deleteOne(corUser);
        else if(corUser && !rewrite)
            return res.status(400).json({ error: `User already exists with login: ${login}`});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            login,
            occupation,
            city,
            role,
            partnerId,
            blocked,
            password: passwordHash,
        });
        const savedUser = await newUser.save();

        delete savedUser.password;
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const changePassword = async (req, res)=>{
    try {
        const { login, partnerId, password } = req.body;

        const user = await User.findOne({login: login, partnerId: partnerId});

        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const updateUser = await  User.updateOne({_id: user._id}, {$set:{password: passwordHash}});

        delete user.password;
        res.status(200).json({ updateUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({login: login});

        if (!user) return res.status(400).json({ msg: "User does not exist."});

        if (user.blocked) return res.status(400).json({ msg: "User is blocked."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            city: user.city,
            occupation: user.occupation,
            partnerId: user.partnerId
        }, process.env.JWT_SECRET);
        // delete user.password;
        user.password = "";
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsers = async  (req, res)=>{
    try {
        const { id } = req.params;

        const user = await User.find({partnerId: id});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};