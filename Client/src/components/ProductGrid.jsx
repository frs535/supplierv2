import {DataGrid} from "@mui/x-data-grid";
import {IconButton, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCount, increaseCount, setValueToCart} from "state";
import {useGetProductsQuery} from "../state/api";
import React from "react";
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

const ProductGrid = ()=> {
	const id = useSelector(state => state.global.user.partnerId);
	const { groupId } = useParams();
	const { data=[], error, isLoading, isFetching, isError } = useGetProductsQuery({id, groupId});

	const navigate = useNavigate();
	const theme = useTheme();
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
									src={`http://95.216.198.114:5001/${p.row.images[0].url256}`}
									// style={{ objectFit: "contain" }}
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
			flex: 0.3
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
			flex: 0.3
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
			flex: 0.3,
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
			getRowId={(row) => row.id}
		/>);
}

export default ProductGrid;