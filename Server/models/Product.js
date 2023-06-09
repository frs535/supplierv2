import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
    },
    article:String,
    name: String,
    unit:String,
    unitReport: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default:0
    },
    price: {
        type:Number,
        default: 0
    },
    priceReport:{
            type: Number,
            default:0
    },
    currency:{
        type: String,
        default: "RUB",
    },
    description: String,
    category: String,
    rating: {
        type: Number,
        default: 0
    },
    factory: {
        type: String,
        default: "",
    },
    group: String,
    weight:{
        type:Number,
        default: 0
    },
    length:{
        type:Number,
        default: 0
    },
    volume:{
        type: Number,
        default:0
        },
    area:{
        type: Number,
        default:0
    },
    searchId:{
        type:String,
        default:""
    },
    imagesPath: [
        {
            path: {
                type: String,
                default:"",
            },
            bigPath: {
                type: String,
                default:"",
            },
            default: []
        },
        ],
},
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;