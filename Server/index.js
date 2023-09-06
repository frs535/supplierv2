import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* OTHER PROJECT */
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
 import AffiliateStat from "./models/AffiliateStat.js";

 import {
     dataUser,
     dataProduct,
     dataProductStat,
     dataTransaction,
     dataOverallStat,
     dataAffiliateStat,
 } from "./data/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiKeys from "./models/ApiKeys.js";
import {deleteImages, getImages, postImage} from "./controllers/images.js";
import fs from 'fs';
import Price from "./models/Price.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({
    // verify: (req, res, buf) => {
    //     req.rawBody = buf.toString()
    // },
    limit: '50mb'
}));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.params
        const path = `public/assets/${id}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//app.use(upload.single("file"));

/* ROUTES WITH FILES */
//app.post("/auth/register", upload.single("picture"), register); //Картинку надо вставлять вместе с методом вставки
//app.post("/posts", verifyToken, upload.single("picture"), createPost);  //VERIFY TOKEN!!!!
app.post("/images/:id", verifyToken, upload.single("file"), postImage);
app.get("/images/:id/:type", verifyToken, upload.single("file"), getImages);//VERIFY TOKEN!!!!
app.delete("/images/:id", verifyToken, deleteImages);

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
//app.use("/sales",verifyToken,  salesRoutes); //EXAMPLE VERIFY TOKEN

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT,  async () => {

            console.log(`Server port: ${PORT}`);

            const apiKeys = await ApiKeys.findOne({});

            if (apiKeys) return;

            const token = jwt.sign({ id: 0, login: "Admin", role: "admin" }, process.env.JWT_SECRET);

            const newApiKey = new ApiKeys(
                    {
                        Key: token,
                        blocked : false
                    }
                );
            const  res  = await newApiKey.save();
            console.log(`Server API KEY: ${token}`);
        });

        /* ONLY ADD DATA ONE TIME */
        // AffiliateStat.insertMany(dataAffiliateStat);
        // OverallStat.insertMany(dataOverallStat);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // User.insertMany(dataUser);
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });