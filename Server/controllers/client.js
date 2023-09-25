import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Catalog from "../models/Catalog.js";
import Price from "../models/Price.js";
import Order from "../models/Order.js";
import Stock from "../models/Stock.js";
import Image from "../models/Image.js";
import e from "express";

export const getProducts = async (req, res) => {
    try {
        const { partnerId } = req.user;
        if (!partnerId) return  res.status(404).json({ message: "Unknown partner" });

        const { groupId } = req.query;

        const products = groupId? await Product.find({"searchId" : {$regex : groupId}}) : await Product.find();

        const result = await Promise.all(products.map(async product=>{
            const prices = await Price.findOne({partnerId, catalogId: product.id})
                .then(doc=> doc?.prices);

            const defPrice = prices && prices.length > 0 ? prices[0] : {value: 0, unit: { id: "", name: ""}};

            const stock = await Stock.find({catalogId: product.id,});
            const quantity =  stock.reduce((acc, cur) => { return acc + cur.quantity }, 0);

            const images = await Image.find({id: product.id, destination: "product"}).sort({updatedAt: -1});

            return {
                id: product.id,
                name: product.name,
                article: product.article,
                quantity: quantity,
                unit: defPrice.unit.name,
                price: defPrice.value,
                prices,
                stock,
                order: 0,
                images
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { partnerId } = req.user;
        if (!partnerId) return  res.status(404).json({ message: "Unknown partner" });

        const { id } = req.query;
        if (!id) return res.status(404).json({ message: "Unknown product id" });

        const product = await Product.findOne({"id": id});
        if (!product) return res.status(404).json({ message: "Product not found" });

        const prices = await Price.findOne({partnerId, catalogId: product.id})
            .then(doc=> doc.prices);

        const defPrice = prices.length > 0 ? prices[0] : {value: 0, unit: { id: "", name: ""}};

        const stock = await Stock.find({catalogId: product.id,});

        const images = await Image.find({id, destination: "product"}).sort({updatedAt: -1});

        res.status(200).json({product,  stock, prices, defPrice, images});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export  const patchProduct = async (req, res) => {
    try {

        await Product.deleteMany();
        const savedProduct = await Product.insertMany(req.body);

        res.status(200).json({savedProduct: savedProduct.length})
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

    await Product.deleteMany();
    await Catalog.deleteMany();

    try {
        req.body.map(async (catalog)=>{

            const {
                id,
                code,
                name,
                child,
            } = catalog;

            const foundCatalog = Catalog.findOne({id: id})
            if(!foundCatalog)
                await Catalog.deleteOne(foundCatalog);

            const newCatalog= new Catalog({
                id,
                code,
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

export const getPrice = async (req, res) =>{
    try {
        const { id, companyId } = req.params;

        const price = await Price.find({partnerId : id, companyId});
        if (!price)
        {
            res.status(404).json({ message: "Price list not found" });
            return;
        }

        res.status(200).json(price);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const postPrice = async (req, res)=>{
    try {
        const { partnerId, companyId,  catalogId} = req.body;

        const oldPrice = await Price.findOne({
            partnerId,
            companyId,
            catalogId
        });

        if (oldPrice)
        {
            const { price }= req.body;
            const updResult = await Price.updateOne({_id: oldPrice._id}, {$set: {price: price}});
            res.status(200).json(updResult);
        }
        else
        {
            const newPrice = new Price(req.body);
            const savedPrice = await newPrice.save();
            res.status(200).json(savedPrice);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getStock = async (req, res)=>{
    try {
        const stock = await Stock.find();
        res.status(200).json(stock);
    }
    catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export const postStock = async (req, res)=>{
    try {
        await Stock.deleteMany();
        const savedStock = await Stock.insertMany(req.body);
        res.status(200).json(savedStock);
    }
    catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export  const getOrder = async (req, res) =>{
    try {
        const { id } = req.query;

        let filter = {id};

        if (req.user.role !== "admin")
            filter.partnerId = req.user.partnerId;

        const orders = await Order.findOne(filter);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export  const getOrders = async (req, res) =>{
    try {
        const {page = 0, pageSize = 10, sort = null,  status } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };

        const sortFormatted = Boolean(sort) ? generateSort() : {updatedAt: -1};

        let filter = {}
        if (status !== undefined)
            filter = {status};

        if (req.user.role !== "admin")
            filter.partnerId = req.user.partnerId;

        const orders = await Order.find(filter)
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Order.countDocuments(filter);

        res.status(200).json({orders, total});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postOrder = async (req, res) =>{
    try {

        const { id } = req.body;

        const result = await Order.replaceOne({id}, req.body, {upsert: true});

        //const savedOrder = await newOrder.save();
        res.status(200).json({id, updatedAt: new Date()});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

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