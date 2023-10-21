import Header from "../../components/Header";
import {Box, IconButton, Link, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useGetOrdersQuery} from "state/api";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {string} from "yup";
import Button from '@mui/material/Button';
export const Orders = () => {

    const warehouses = useSelector((state) => state.global.warehouses);
    const [sort, setSort] = useState({});
    const navigate = useNavigate();

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const { data=[], error, refetch, isLoading, isFetching, isError } = useGetOrdersQuery({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: JSON.stringify(sort),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return(<div>
            <div>{error.status}</div>
            <div>{error.data?.message}</div>
        </div>);
    }

    const getStatus = status=>{
        let localStatus = ""
        switch (status) {
            case 'Created':
                return 'Создан'
                break;
            case 'Received':
                return 'Получен'
                break;
            case 'Confirmed':
                return 'Подтвержден'
                break;
            case 'InDelivery':
                return 'В доставке'
                break;
            case 'Closed':
                return "Закрыт"
                break;
            case 'Canceled':
                return 'Отменен'
                break;
            case 'HasProblems':
                return 'Есть проблемы'
            default:
                return 'Не определен'
        }
    }

    const renderCellStatus = (row, rowData)=>{
        let localStatus = '#76777d'
        switch (row.status) {
            case 'Created':
                localStatus = '#ffffff'
                break;
            case 'Received':
                localStatus = '#00bbff'
                break;
            case 'Confirmed':
                localStatus = '#00ff00'
                break;
            case 'InDelivery':
                localStatus = '#3051fd'
                break;
            case 'Closed':
                localStatus = '#009338'
                break;
            case 'Canceled':
                localStatus = '#ff0011'
                break;
            case 'HasProblems':
                localStatus=  '#c17d02'
        }


        return (
            <Link color={localStatus} fontSize="bold"
                onClick={()=>navigate(`/orders/${row.id}`)}
                style={{ cursor: 'pointer'}}
            >{rowData}</Link>
        )
    }

    const renderCell = (row, rowData)=>{

        return (
            <Link color="primary.dark"
                  onClick={()=>navigate(`/orders/${row.id}`)}
                  style={{ cursor: 'pointer'}}
            >{rowData}</Link>
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
            flex: 1,//`${p.row.data.day}/${p.row.data.month}/${p.row.data.year}`
            renderCell: (p)=>renderCell(p.row, new Date(p.row.data).toLocaleDateString("ru-Ru"))
        },
        {
            field: "warehouse",
            headerName: "Склад",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, warehouses.find(w=>w.id === p.row.warehouseId)?.name)
        },
        {
            field: "amount",
            headerName: "Сумма",
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCell(p.row, new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUR',
            }).format(p.row.amount))
        },
        {
            field: "status",
            headerName: "Статус",
            type: 'string',
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (p)=>renderCellStatus(p.row, getStatus(p.row.status))
        },
    ];

    return (
        <Box>
            <Header title="Ваши заказы"></Header>
            <Button sx={{ mt: "30px", mb: "20px"}} variant="contained" onClick={()=>{refetch()}}>Обновить</Button>
            <DataGrid loading={isLoading}
                      sx={{ flexGrow: 1, minWidth:50, overflowY: 'auto' }}
                      columns={columns}
                      rows={data.orders}
                      rowCount={(data && data.total) || 0}
                      getRowId={(row) => row.id}
                      pagination
                      paginationMode="server"
                      sortingMode="server"
                      pageSizeOptions={[10, 20, 50]}
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      onSortModelChange={(newSortModel) => setSort(...newSortModel)}/>
        </Box>
    )
}

export default Orders;