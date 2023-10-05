import Header from "../../components/Header";
import {Box, Link, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetOrderQuery} from "../../state/api";
import {useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const Order = () => {

    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();

    const { data=[], error, isLoading, isError } = useGetOrderQuery(id);

    const warehouses = useSelector((state) => state.global.warehouses);
    const partner = useSelector((state) => state.global.partner);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (<div>
            <div>{error?.status}</div>
            <div>{error?.data.message}</div>
        </div>);
    }

    const getStatus = status=>{
        switch (status) {
            case 'Created':
                return 'Создан'
            case 'Received':
                return 'Получен'
            case 'Confirmed':
                return 'Подтвержден'
            case 'InDelivery':
                return 'В доставке'
            case 'Closed':
                return "Закрыт"
            case 'Canceled':
                return 'Отменен'
            case 'HasProblems':
                return 'Есть проблемы'
            default:
                return 'Не определен'
        }
    }

    const renderCell = (row, rowData)=>{
        return (
            <Link
                onClick={()=>navigate(`/product/${row.productId}`)}
                style={{ cursor: 'pointer'}}
            >{rowData}</Link>
        )
    }

    const columns = [
        {
            field: "rowNumber",
            headerName: "№ пп",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.1,
        },
        {
            field: "productName",
            headerName: "Товар",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, p.row.productName)
        },
        {
            field: "quantity",
            headerName: "Кол.",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            // renderCell: (p)=>renderSimpleCell(new Intl.NumberFormat('ru-Ru', { maximumSignificantDigits: 3 })
            //     .format(p.row.amount)).format(p.row.amount)
        },
        {
            field: "unitName",
            headerName: "Упак.",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
        {
            field: "price",
            headerName: "Цена",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
        {
            field: "amountTaxes",
            headerName: "НДС",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
        {
            field: "discountAmount",
            headerName: "Скидка",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
        {
            field: "amount",
            headerName: "Сумма",
            type: 'number',
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
    ];

    const order = data;

    return (
        <Box sx={{ m:"10px"}}>
            <Header title= {`Заказ № ${order.number === ""? "<>": order.number} /${new Date(order.data).toLocaleDateString("ru-Ru")}`} subtitle=""></Header>
            <Box>
                <Typography component="h1" variant="h4" color="secondary">{`Статус: ${getStatus(order.status)}`}</Typography>
            </Box>
            <Box sx={{ mt:"10px", width: '100%' }}>
                <Box>
                    <Typography component="h1" variant="h5">Заказ оформлен {partner?.companies.find(w=>w.id === order.companyId)?.name}</Typography>
                    <Typography component="h1" variant="h5">Дата готовности {new Date(order.deliveryDate).toLocaleDateString("ru-Ru")}</Typography>
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentTab} onChange={(event, newValue)=>{setCurrentTab(newValue)}}>
                        <Tab label={`Товары (${order.goods.length})`}/>
                        <Tab label="Дополнительно"/>
                    </Tabs>
                </Box>
                {currentTab === 1 &&
                    <Box>
                        <Typography>Заказ оформлен {partner?.companies.find(w=>w.id === order.companyId)?.name}</Typography>
                        <Typography>Тип доставки {order.deliveryType === "delivery"? 'Самовывоз': 'Доставка'}</Typography>
                        <Typography>Склад {warehouses.find(w=>w.id === order.warehouseId)?.name}</Typography>
                    </Box>
                }
                {currentTab === 0 &&
                    <Box sx={{m: "10px"}}>
                        <DataGrid loading={isLoading}
                                  sx={{ flexGrow: 1, minWidth:50, minHeight: 450, overflowY: 'auto' }}
                                  columns={columns}
                                  rows={order.goods}
                                  getRowId={(row) => row.rowNumber}/>
                        <Typography component="h1" variant="h4" align="right">Сумма заказа: {order.amount}</Typography>

                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Order;