import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, IconButton, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useGetProductsQuery} from "../state/api";
import React from "react";
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

const ProductGrid = ()=> {
	const id = useSelector(state => state.global.user.partnerId);
	const { groupId } = useParams();
	const { data=[], error, isLoading, isError } = useGetProductsQuery({id, groupId});
	const theme = useTheme();

	const navigate = useNavigate();

	const renderCell = (text, id)=>
	{
		return (
			<Button
				sx={{
					color: theme.palette.primary.dark,
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					overflowX: "none",
					button: {
						flex: "none"
					}
				}}
				variant="text"
				onClick={()=>navigate(`/product/${id}`)}
			>{text}</Button>
		)
	}

	const columns = [
		{
			field: "images",
			headerName: "",
			sortable: false,
			cellClassName: 'actions',
			flex: 0.2,
			renderCell: (p) => {
				return (
					<IconButton onClick={()=> navigate(`/product/${p.id}`)}>
						{
							p.row.images.length > 0 ?
								<img
									alt={p.row.images[0].description}
									width="100%"
									height="80%"
									loading="lazy"
									src={`/${p.row.images[0].url256}`}
								/>:
								<HideImageOutlinedIcon/>
						}
					</IconButton>
				)
			},
		},
		{
			field: "article",
			headerName: "Артикул",
			headerAlign: "left",
			align: "left",
			flex: 0.3,
			renderCell: (p)=>renderCell(p.row.article, p.id),
		},
		{
			field: "name",
			headerName: "Товар",
			headerAlign: "left",
			align: "left",
			flex: 1.5,
			renderCell: (p)=>renderCell(p.row.name, p.id),
		},
		{
			field: "quantity",
			headerName: "Cклад",
			type: 'number',
			headerAlign: "left",
			align: "left",
			flex: 0.3,
			renderCell: (p)=>renderCell(p.row.quantity, p.id),
		},
		{
			field: "unit",
			headerName: "Упак",
			headerAlign: "left",
			align: "left",
			flex: 0.2,
			renderCell: (p)=>renderCell(p.row.unit, p.id),
		},
		{
			field: "price",
			headerName: "Цена",
			type: 'number',
			headerAlign: "left",
			align: "left",
			flex: 0.3,
			renderCell: (p)=>renderCell(p.row.price, p.id),
		},
		// {
		// 	field: "order",
		// 	headerName: "К заказу",
		// 	type: 'number',
		// 	editable: true,
		// 	headerAlign: "left",
		// 	align: "left",
		// 	flex: 0.3,
		// },
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
			getRowId={(row) => row.id}
		/>);
}

export default ProductGrid;