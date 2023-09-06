// import mongoose from "mongoose";
//
// const priceSchemaOld = new mongoose.Schema(
//     {
//         partnerId: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         companyId: String,
//         price:[
//             {
//                 catalogId: {
//                     type: String,
//                     required: true,
//                     unique: true,
//                 }, //catalogId
//                 warehouseId: {
//                     type: String,
//                     required: true
//                 }, //warehouseId
//                 quantity: Number,
//                 costs:[
//                     {
//                         priority: {
//                             type: Number,
//                             unique: true,
//                             required: true,
//                         },
//                         value: {
//                             type: Number,
//                             required: true
//                         }, //value
//                         quantity: {
//                             type: Number,
//                             default: 0
//                         },
//                         includeTax: {
//                           type: Boolean,
//                           default: true
//                         }, //includeTax
//                         order: {
//                             type: Boolean,
//                             default: true
//                         },
//                         currency: {
//                             type: String,
//                             required: true
//                         }, //currency
//                         unit: {
//                             id: {
//                                 type: String,
//                                 required: true
//                             },
//                             name: {
//                                 type: String,
//                                 required: true
//                             }
//                         },
//                         multiple: {
//                             type: Number,
//                             default: 1
//                         },
//                         priceTypeId: {
//                             type: String,
//                             required: true
//                         },
//                     }
//                 ],
//             }
//         ],
//     },
//     { timestamps: true }
// );
//
// const Price = mongoose.model("PriceOld", priceSchemaOld);
// export default Price;