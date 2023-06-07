import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        max: 32,
        min: 32,
        unique: true,
    },
    name: String,
    child:[],
});

const Catalog = mongoose.model("Catalog", CatalogSchema);
export default Catalog;