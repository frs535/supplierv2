import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        number: {
            type: String,
            required: true
        },
        data: {
            type: Date,
            required: true
        },
        deliveryType: String, //Тип доставки
        deliveryAddress: String, //Адрес доставки товара
        deliveryDate: Date, //Желаемая дата поставки
        wholeShip: Boolean, //Заказ будет отгружаться только целиком, когда все позиции на складе.
        currencyId: String, //Идентификатор валюты
        amount: Number, //Сумма документа
        partnerId: String, //Ссылка на партнера
        companyId: String, //Ссылка на организацию
        contractId: String, //Ссылка на договор
        agreementId: String, //Ссылка на соглашение
        warehouseId: String, //Ссылка на склад
        confirmed: Boolean, //Подтвержден учетной системой
        uploaded: Boolean, //Загружен в учетную систему
        goods: [
            {
                productId: String, //Ссылка на товар
                unitRef: String, //Ссылка на упаковку
                quantity: Number, // Количество
                amount: Number, //Сумма
                price: Number, // Цена
                priceByUnit: Number, //Цена за упаковку
                unitQuantity: Number, //Количество упаковок
                TAXRate:String, //Ставка НДС
                amountTaxes: String //Сумма НДС
            }
        ]


    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;