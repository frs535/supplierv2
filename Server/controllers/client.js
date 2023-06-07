import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Catalog from "../models/Catalog.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stat,
                };
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export  const patchProduct = async (req, res) => {
    try {
        req.body.map(async (product)=>{

            const imagesPaths = product.imagesPath != null? product.map((paths)=>{
                return {path, bigPath} = paths;
            }): null;
            const {
                id,
                code,
                name,
                unit,
                quantity,
                price,
                description,
                category,
                rating,
                factory,
                group,
            } = product;

            const foundProduct = Product.findOne({id: id})
            if(!foundProduct)
                Product.deleteOne(foundProduct);

            const newProduct = new Product({
                id,
                code,
                name,
                unit,
                quantity,
                price,
                description,
                category,
                rating,
                factory,
                group,
                imagesPath: imagesPaths
            });
            const savednewProduct = await newProduct.save();
        });

        res.status(200).json({message: 'successful'})
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getCatalogs = async  (req, res)=>{
    try {
        const catalogs = await Catalog.find();

        res.status(200).json(catalogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const patchCatalog = async (req, res)=>{
    try {
        req.body.child.map(async (catalog)=>{

            const {
                id,
                name,
                child,
            } = catalog;

            const foundCatalog = Catalog.findOne({id: id})
            if(!foundCatalog)
                Catalog.deleteOne(foundCatalog);

            const newCatalog= new Catalog({
                id,
                name,
                child,
            });
            const savedCatalog = await newCatalog.save();
        });

        res.status(200).json({message: 'successful'})
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};