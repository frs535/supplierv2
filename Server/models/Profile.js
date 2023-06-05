import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        companyName: {
            type: String,
            required: true,
            min: 2,
            max: 100,
            default: ""
        },
        phoneNumber: {
            type: String,
            required: false,
            max: 50,
            unique: true,
            default: ""
        },
        email: {
            type: String,
            required: false,
            max: 50,
            unique: true,
            default: ""
        },
        deliveryAddress: [
            {
                address: String,
                presentation: String,
            },
        ],
        managerName :{
            type: String,
            required:false,
            min: 2,
            max: 100,
            default: ""
        },
        managerPhone:{
            type: String,
            required:false,
            min: 2,
            max: 100,
            default: ""
        },
        managerEmail:{
            type: String,
            required:false,
            min: 2,
            max: 100,
            default: ""
        },
        managerPicturePath:{
            type: String,
            default: "",
        },
    },
{ timestamps: true }
);

const  Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;