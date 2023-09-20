import Header from "../../components/Header";
import {Box, IconButton, Link, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useGetOrderQuery} from "state/api";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
export const Orders = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();

    const { data=[], error, isLoading, isFetching, isError } = useGetOrderQuery({id:""});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return(<div>
            <div>{error.status}</div>
            <div>{error.data?.message}</div>
        </div>);
    }

    const renderCell = (row, rowData)=>{
        return (
            <Link href={`/Orders/${row.id}`}>{rowData}</Link>
        )
    }

    const columns = [
        {
            field: "number",
            headerName: "Номер",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, p.row.number)
        },
        {
            field: "data",
            headerName: "Дата",
            type: 'Date',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, p.row.data)
        },
        {
            field: "status",
            headerName: "Статус",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, p.row.status)
        },
        {
            field: "amount",
            headerName: "Сумма",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
    ];

    return (
        <Box>
            <Header title="Заказы" subtitle="Отображаются все ваши заказы"></Header>
            <DataGrid loading={isLoading}
                      sx={{ height: 900, flexGrow: 1, minWidth:50, overflowY: 'auto' }}
                      columns={columns}
                      rows={data}
                      getRowId={(row) => row.id}/>
        </Box>
    )
}

export default Orders;