import jwt from "jsonwebtoken";
import ApiKeys from "../models/ApiKeys.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimEnd();//.trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified.role !== 'admin')
        {
            const user = await User.findOne({login: verified.login, blocked: false})
            if (!user)
                return res.status(403).send("Access denied");
        }
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: "Access denied" });
    }
};

