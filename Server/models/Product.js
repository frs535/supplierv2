import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
    },
    code:String,
    name: String,
    unit:String,
    quantity: Number,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    factory: Number,
    group: String,
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
        },
        ],
},
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;