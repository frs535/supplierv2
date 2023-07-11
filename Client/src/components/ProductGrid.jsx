import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import SaveIcon from '@mui/icons-material/Save';

import {decreaseCount, increaseCount} from "state";

const ProductGrid = ()=> {
	const navigate = useNavigate();
	const theme = useTheme();
	const { groupId } = useParams();
	const items = useSelector((state)=>state.items);
	const cart	= useSelector(state => state.cart);
	const rows= items.filter(item => {return item.searchId.includes(groupId)});

	function getCount({item})  {
		const result = cart.filter(it=>{ return it.id === item.id });
		if (result.length=== 0) return 0;

		return  0;//result[0];
	};

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
					<IconButton onClick={row => decreaseCount(row, (Math.max(getCount(row) - 1, 0)))}>
						{/**/}
						<RemoveIcon />
					</IconButton>
					<Typography sx={{ p: "0 5px" }}>
						{/*{count}*/}
					</Typography>
					<IconButton onClick={row => increaseCount(row, getCount(row) + 1)}>
						<AddIcon />
					</IconButton>
					<IconButton onClick={()=> navigate(`/product/${p.id}`)}>
						<InfoOutlinedIcon/>
					</IconButton>
				</Box>)
			},
		},
	];

	return (Array.isArray(rows) && rows.length!=0?
			<DataGrid
			sx={{ height: 900, flexGrow: 1, minWidth:50, overflowY: 'auto' }}
			columns={columns}
			rows={rows}
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
		/>:
			<Box display="flex" height="100vh" width="100vw"
				sx={{
					width: "100%",
					height: "100%",
					backgroundColor: 'primary.neutral',
				}}>Выберите группу</Box>
	)
}

export default ProductGrid;