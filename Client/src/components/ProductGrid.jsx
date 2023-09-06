import {DataGrid} from "@mui/x-data-grid";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {decreaseCount, increaseCount, setValueToCart} from "state"; //getQuantity
import {useGetPriceQuery, useGetProductsQuery} from "../state/api";

import {
	GridColDef,
	GridRowsProp,
	GridCellEditStopParams,
	GridCellEditStopReasons,
	MuiEvent,
} from '@mui/x-data-grid';
import React from "react";

const ProductGrid = ()=> {
	const id = useSelector(state => state.global.user.partnerId);
	const { groupId } = useParams();
	const { data=[], error, isLoading, isFetching, isError } = useGetProductsQuery({id, groupId});

	const navigate = useNavigate();
	const theme = useTheme();
	const cart	= useSelector(state => state.global.cart);
	const dispatch = useDispatch();

	function decrease(item){
		dispatch(decreaseCount(item));
	}

	function increase(item){
		dispatch(increaseCount(item));
	}

	const columns = [
		{
			field: "images",
			headerName: "",
			sortable: false,
			flex: 0.2,
			renderCell: (p) => {
				return (p.row.images.length > 0 ?
						<img
							alt={p.row.images[0].description}
							width="100%"
							height="80%"
							loading="lazy"
							src={`http://95.216.198.114:5001/${p.row.images[0].url256}`}
							style={{ objectFit: "contain" }}
						/>:
				"")
			},
		},
		{
			field: "article",
			headerName: "Артикул",
			headerAlign: "left",
			align: "left",
			flex: 0.25
		},
		{
			field: "name",
			headerName: "Товар",
			headerAlign: "left",
			align: "left",
			flex: 1.5
		},
		{
			field: "quantity",
			headerName: "Cклад",
			type: 'number',
			headerAlign: "left",
			align: "left",
			flex: 0.2
		},
		{
			field: "unit",
			headerName: "Упак",
			headerAlign: "left",
			align: "left",
			flex: 0.2
		},
		{
			field: "price",
			headerName: "Цена",
			type: 'number',
			headerAlign: "left",
			align: "left",
			flex: 0.3
		},
		{
			field: "order",
			headerName: "К заказу",
			type: 'number',
			editable: true,
			headerAlign: "left",
			align: "left",
			flex: 0.3
		},
		{
			field: "action",
			headerName: "Action",
			sortable: false,
			cellClassName: 'actions',
			flex: 0.5,
			renderCell: (p)=> {
				return (<Box
					display="flex"
					alignItems="center"
					border={`1.5px solid ${theme.palette.neutral[300]}`}
					mr="20px"
					p="2px 5px"
				>
					<IconButton onClick={()=> navigate(`/product/${p.id}`)}>
						<InfoOutlinedIcon/>
					</IconButton>
				</Box>)
			},
		},
	];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return(<div>
			<div>{error.status}</div>
			<div>{error.data?.message}</div>
		</div>);
	}

	return (<DataGrid
			loading={isLoading}
			sx={{ height: 900, flexGrow: 1, minWidth:50, overflowY: 'auto' }}
			columns={columns}
			rows={data}
			onRowEditCommit={(p, e)=>{
				console.log(p);
			}}
			onCellEditStop={(params, event) => {
				const value = Number(event.target.value);
				if (value === Number.NaN) return;

				if (params.row.order === null)
					params.row.order = 0;

				dispatch(setValueToCart({item: params.row, value, images: params.row?.images}));
			}}
			onProcessRowUpdateError={(error)=>
			{
				console.log(error);
			}}
			getRowId={(row) => row.id}
		/>);
}

export default ProductGrid;