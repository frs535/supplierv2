import mongoose from "mongoose";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const orderSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4(),
            required: true,
        },
        number: {
            type: String,
            default: ""
        },
        data: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: "Created"
        },
        deliveryType: {
            type: String,
            default: "pickup"
        }, //Тип доставки
        deliveryAddress: String, //Адрес доставки товара
        deliveryDate: Date, //Желаемая дата поставки
        wholeShip: Boolean, //Заказ будет отгружаться только целиком, когда все позиции на складе.
        currencyId: String, //Идентификатор валюты
        amount: Number, //Сумма документа
        partnerId: String, //Ссылка на партнера
        companyId: String, //Ссылка на организацию партнера
        contractId: String, //Ссылка на договор
        agreementId: String, //Ссылка на соглашение
        warehouseId: { //Ссылка на склад
            type: String,
            default: ""
        },
        confirmed: { //Подтвержден учетной системой
            type: Boolean,
            default: false
        },
        uploaded: { //Загружен в учетную систему
            type: Boolean,
            default: false,
        },
        goods: [
            {
                productId: String, //Ссылка на товар
                unitRef: String, //Ссылка на упаковку
                quantity: Number, // Количество
                amount: Number, //Сумма
                price: Number, // Цена
                priceTypeId: {
                    type: String,
                    default: ""
                },
                priceByUnit: Number, //Цена за упаковку
                unitQuantity: Number, //Количество упаковок
                TAXRate:String, //Ставка НДС
                amountTaxes: Number, //Сумма НДС
                warehouseId: {
                    type: String,
                    default: ""
                },
            }
        ]
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;