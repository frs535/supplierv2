import {DataGrid} from "@mui/x-data-grid";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {decreaseCount, increaseCount} from "state";
import {useGetProductsQuery} from "../state/api";

const ProductGrid = ()=> {
	const { data=[], isLoading, isFetching, isError } = useGetProductsQuery();
	const navigate = useNavigate();
	const theme = useTheme();
	const { groupId } = useParams();
	const cart	= useSelector(state => state.global.cart);
	const dispatch = useDispatch();

	function getCount({item})  {
		const result = cart.filter(it=>{ return it.id === item.id });
		if (result.length=== 0) return 0;

		return  0;//result[0];
	};

	function decrease(item){
		dispatch(decreaseCount(item, Math.max(getCount(item) - 1, 0)));

	}

	function increase(item){
		dispatch(increaseCount(item, getCount(item) + 1));
	}

	const columns = [
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
			headerName: "Кол.",
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
			field: "unitReport",
			headerName: "Упак",
			headerAlign: "left",
			align: "left",
			flex: 0.3
		},
		{
			field: "priceReport",
			headerName: "Цена",
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
					<IconButton onClick={()=>decrease(p.row)}>
						<RemoveIcon />
					</IconButton>
					<Typography sx={{ p: "0 5px" }}>
						{getCount(p)}
					</Typography>
					<IconButton onClick={()=>increase(p.row)}>
						<AddIcon/>
					</IconButton>
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
		return <div>Error: </div>;
	}

	return (<DataGrid
			sx={{ height: 900, flexGrow: 1, minWidth:50, overflowY: 'auto' }}
			columns={columns}
			rows={data.filter(item => {return item.searchId.includes(groupId)})}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 25,
					},
				}
			}}
			disableVirtualization={true}
			disableRowSelectionOnClick={true}
			disableMultipleSelection={true}
			getRowId={(row) => row._id}
		/>);
}

export default ProductGrid;