import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            min: 2,
            max: 100,
        },
        lastName: {
            type: String,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: false,
            max: 50,
            //unique: true,
        },
        phoneNumber: {
            type: String,
            required: false,
            max: 50,
            //unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath:{
            type: String,
            default: "",
        },
        city: String,
        occupation: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        partnerId : {
            type: String,
            required: true,
            default: ""
        },
        partnerName: {
            type: String,
            required: true,
            default: ""
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;