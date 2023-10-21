import {Box, Typography, useTheme} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Item from "../../components/Item";
import {setValueToCart} from "state";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useGetProductQuery } from "state/api";
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { itemId } = useParams();
	const [currentTab, setCurrentTab] = useState("description");

	const [image, setImage] = useState(null);
	const [items, setItems] = useState([]);
	const theme = useTheme();
	const cart = useSelector((state) => state.global.cart);
	const warehouses = useSelector((state) => state.global.warehouses);

	const { data, error , isLoading, isError } = useGetProductQuery( itemId);

	const columns = [
		{
			field: 'warehouse',
			headerName: 'Склад',
			flex: 0.6,
		},
		{
			field: 'stock',
			headerName: 'Остаток',
			flex: 0.3,
		},
		{
			field: 'toOrder',
			headerName: 'К заказу',
			description: 'Укажите количество для заказа со склада',
			sortable: false,
			flex: 0.4,
			renderCell: (item)=> {
				return (
					<Box display="flex" alignItems="center" minHeight="50px">
						<Box
							display="flex"
							alignItems="center"
						>
							<TextField
								label="К заказу"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={item.row.toOrder}
								InputProps={{
									endAdornment: <InputAdornment position="end">{data?.defPrice.unit.name}</InputAdornment>,
									inputMode: 'numeric',
									pattern: '[0-9]*'
								}}
								size="small"
								onChange={event => {
									//setCount(event.target.value);

									let value = Number(event.target.value);
									if (value == Number.NaN)
										value = 0;

									dispatch(setValueToCart({item: data.product, value, images: data.images, wh: item.id, price: item.row.price}));
									//const it = count.filter(i => item.warehouseId === i.warehouseId)?.count;
								}}
							/>
						</Box>
					</Box>
				)
			}
		},
	];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return(<div>
			<div>{error.status}</div>
			<div>{error.data.message}</div>
		</div>);
	}

	const warehouseStock = data?.stock.map(item => ({
		id: item.warehouseId,
		warehouse: warehouses.find(w => w.id === item.warehouseId)?.name,
		stock: `${item.quantity} ${data?.product.storeUnit.name}`,
		toOrder: cart.find(card=> card.id === item.catalogId && card.wh === item.warehouseId)?.order,
		price: data.defPrice,
	}));

	return (
		<Box width="80%" m="40px auto">
			<Box display="flex" flexWrap="wrap" columnGap="20px">
				{/* IMAGES */}
				<Box flex="1 1 40%" mb="0px">
					{
						data.images.length > 0 || image?
							<img
								alt={ image? image.description: data.images[0].description}
								width="100%"
								height="100%"
								loading="lazy"
								src={`/${image? image.url256: data?.images[0].url512}`}
								style={{ objectFit: "contain" }}
							/>:
							""
					}
					{
						data.images.length > 1 || image?
							<Pagination count={data?.images.length}
										variant="outlined"
										color="primary"
										onChange={(evt, number)=>{
											setImage(data?.images[number-1]);
										}}
										sx={{ ml: "15px" }}
							/>:
							""
					}
				</Box>

				{/* ACTIONS */}
				<Box flex="1 1 50%" mb="40px">
					<Box display="flex" justifyContent="space-between">
						{/*<Box>Home/Item</Box>*/}
						{/*<Box>Prev Next</Box>*/}
					</Box>

					<Box m="5px 0 25px 0">
						<Typography variant="h7" color="secondary">{data?.product.category}</Typography>

						<Typography variant="h3">{data?.product?.name}</Typography>

						{/* RATING */}
						<Rating sx={{mt: "20px"}}
								name="simple-controlled"
								value={data? data?.product?.rating: 0}
								readOnly
						/>

						<Typography variant="h6" sx={{ mt: "10px" }}>АРТИКУЛ: {data?.product?.article}</Typography>

						{/* PRICE */}
						<Typography variant="h4" sx={{ mt: "20px" }}> Цена</Typography>
						{
							Array.isArray(data?.prices) & data?.prices.map(item=>(
								<Typography variant="h5" m="0 0 0 10px" sx={{ mt: "10px" }}>₽ {Math.round(item.value)} / {item.unit.name}</Typography>
							))
						}
					</Box>

					{/*STOCK*/}
					<Box m="20px 0 5px 0">
						{
							data?.stock.length > 0 ?
								<Typography variant="h5">ОСТАТКИ</Typography>:
								<Typography variant="h5" color={theme.palette.primary.blue}>НЕТ НА СКЛАДЕ</Typography>
						}
						<Box m="20px 0 5px 20px">
							{
								data?.stock.length > 0 ?
									<DataGrid columns={columns}
											  rows={warehouseStock}
											  getRowId={row=> row.id}
											  loading={data === null}
											  slots={{
												  loadingOverlay: LinearProgress,
												  columnHeaders: () => null,
											  }}
											  hideFooter>

									</DataGrid>
									: ""
							}
						</Box>
					</Box>
				</Box>
			</Box>

			{/* INFORMATION */}
			<Box sx={{mt: "50px"}}>
				<Tabs value={currentTab} onChange={(event, newValue) => {
					 	setCurrentTab(newValue);
					 }}>
					<Tab label="ОПИСАНИЕ" currentTab="description" />
					<Tab label="ХАРАКТЕРИСТИКИ" currentTab="characteristics" />
					<Tab label="ОТЗЫВЫ" currentTab="reviews" />
				</Tabs>
			</Box>
			<Box display="flex" flexWrap="wrap" gap="15px">
				{currentTab === "description" && (
					<div>{data?.product?.description}</div>
				)}
				{currentTab === "characteristics" && <div>Характеристики продукции</div>}
				{currentTab === "reviews" && <div>Отзывы по продукту пока отсутствуют</div>}
			</Box>

			{/* RELATED ITEMS */}
			<Box mt="50px" width="100%">
				<Typography variant="h3" fontWeight="bold">
					Сопутствующие товары
				</Typography>
				<Box
					mt="20px"
					display="flex"
					flexWrap="wrap"
					columnGap="1.33%"
					justifyContent="space-between"
				>
					{items.slice(0, 4).map((item, i) => (
						<Item key={`${item.name}-${i}`} item={item} />
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default ProductDetails;