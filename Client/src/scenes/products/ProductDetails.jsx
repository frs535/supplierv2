import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {addToCart, decreaseCount, increaseCount, removeFromCart, setValueToCart, getQuantity} from "state";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useGetProductQuery } from "state/api";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { itemId } = useParams();
	const [currentTab, setCurrentTab] = useState("description");
	//const [item, setItem] = useState(null);
	const [image, setImage] = useState(null);
	const [items, setItems] = useState([]);
	const theme = useTheme();
	const cart = useSelector((state) => state.global.cart);

	const  startCount = cart.filter(item=>{ return item.id === itemId})
		.reduce((acc, item)=>acc + item.order, 0);

	const [count, setCount] = useState(startCount);

	const { data, error , isLoading, isFetching, isError } = useGetProductQuery( itemId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return
		(<div>
			<div>{error.status}</div>
			<div>{error.error}</div>
		</div>);
	}

	return (
		<Box width="80%" m="40px auto">
			<Box display="flex" flexWrap="wrap" columnGap="20px">
				{/* IMAGES */}
				<Box flex="1 1 40%" mb="0px">
					{/* RATING */}
					{data?.product?.rating === 0 ?
						<Typography component="legend" sx={{ ml: "15px" }}>Рэйтинг еще не задан</Typography>:
						""}
					<Rating sx={{ ml: "15px" }}
						name="simple-controlled"
						value={data? data?.product?.rating: 0}
						readOnly
					/>
					<img
						alt={image? image.description: data?.images[0].description}
						width="100%"
						height="80%"
						loading="lazy"
						src={
							`http://95.216.198.114:5001/${image? image.url256: data?.images[0].url256}`
							}
						style={{ objectFit: "contain" }}
					/>
					<Pagination count={data?.images.length}
								variant="outlined"
								color="primary"
								onChange={(evt, number)=>{
									setImage(data?.images[number-1]);
									}}
								sx={{ ml: "15px" }}
					/>
				</Box>

				{/* ACTIONS */}
				<Box flex="1 1 50%" mb="40px">
					<Box display="flex" justifyContent="space-between">
						{/*<Box>Home/Item</Box>*/}
						{/*<Box>Prev Next</Box>*/}
					</Box>

					<Box m="5px 0 25px 0">
						<Typography variant="h3">{data?.product?.name}</Typography>

						<Typography variant="h6" sx={{ mt: "10px" }}>АРТИКУЛ {data?.product?.article}</Typography>

						{/* PRICE */}
						<Typography variant="h4" sx={{ mt: "20px" }}> Цена: </Typography>
						<Typography variant="h4"> ₽ {data?.defPrice.value}</Typography>

						<Typography sx={{ mt: "20px" }}>
							{data?.product.description}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center" minHeight="50px">
						<Box
							display="flex"
							alignItems="center"
							border={`1.5px solid ${theme.palette.neutral[300]}`}
							mr="20px"
							p="2px 5px"
						>
							<TextField
								label="Количество"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={count}
								InputProps={{
									endAdornment: <InputAdornment position="end">{data?.defPrice.unit.name}</InputAdornment>,
									inputMode: 'numeric',
									pattern: '[0-9]*'
								}}
								size="small"
								onChange={event => {
									setCount(event.target.value);

									let value = Number(event.target.value);
									if (value == Number.NaN)
										value = 0;

									dispatch(setValueToCart({item: data.product, value, images: data.images}));
								}}
							/>
						</Box>
						{/*<Button*/}
						{/*	sx={{*/}
						{/*		backgroundColor: "#222222",*/}
						{/*		color: "white",*/}
						{/*		borderRadius: 0,*/}
						{/*		minWidth: "150px",*/}
						{/*		padding: "10px 40px",*/}
						{/*	}}*/}
						{/*	onClick={() => dispatch(addToCart({ item: { ...data?.catalog, count } }))}*/}
						{/*>*/}
						{/*	ADD TO CART*/}
						{/*</Button>*/}
					</Box>
					<Box>
						<Box m="20px 0 5px 0" display="flex">
							<FavoriteBorderOutlinedIcon />
							<Typography sx={{ ml: "5px" }}>Добавить в избранное</Typography>
						</Box>
						<Typography>КАТЕГОРИЯ: {data?.product.category}</Typography>
					</Box>
				</Box>
			</Box>

			{/* INFORMATION */}
			<Box m="10px 0">
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