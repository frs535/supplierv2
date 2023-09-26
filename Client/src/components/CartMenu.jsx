import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
	decreaseCount,
	increaseCount,
	removeFromCart,
	setIsCartOpen,
	clearBag, setValueToCart,
} from "state";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.global.cart);
	const isCartOpen = useSelector((state) => state.global.isCartOpen);

	const totalPrice = cart.reduce((total, item) => {
		return total + item.order * item.price.value;
	}, 0);

	return (
		<Box
			display={isCartOpen ? "block" : "none"}
			backgroundColor="rgba(0, 0, 0, 0.4)"
			position="fixed"
			zIndex={10}
			width="100%"
			height="100%"
			left="0"
			top="0"
			overflow="auto"
		>
			<Box
				position="fixed"
				right="0"
				bottom="0"
				width="max(400px, 30%)"
				height="100%"
				backgroundColor="white"
			>
				<Box padding="30px" overflow="auto" height="100%">
					{/* HEADER */}
					<FlexBox mb="15px">
						<Typography variant="h3">КОРЗИНА ({cart.length})</Typography>
						<IconButton onClick={() => dispatch(setIsCartOpen({}))}>
							<CloseIcon />
						</IconButton>
					</FlexBox>

					{/* CART LIST */}
					<Box>
						{cart.map((item) => (
							// <Button>TEST</Button>
							<Box key={`${item?.catalog?.name}-${item.id}`}>
								<FlexBox p="15px 0">
									<Box flex="1 1 40%">
										<img
											alt={item?.catalog?.name}
											width="123px"
											height="164px"
											// src={`http://localhost:2000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
											src={
												`${process.env.REACT_APP_BASE_URL}${item?.images[0]?.url256}`
											}
										/>
									</Box>
									<Box flex="1 1 60%">
										<FlexBox mb="5px">
											<Typography fontWeight="bold">
												{item?.catalog?.name}
											</Typography>
											<IconButton
												onClick={() =>
													dispatch(removeFromCart({ id: item.id }))
												}
											>
												<CloseIcon />
											</IconButton>
										</FlexBox>
										<TextField
											label="Количество"
											type="number"
											InputLabelProps={{
												shrink: true,
											}}
											value={item?.order}
											InputProps={{
												endAdornment: <InputAdornment position="end">{item.catalog.unit}</InputAdornment>,
												inputMode: 'numeric',
												pattern: '[0-9]*'
											}}
											size="small"
											onChange={event => {

												let value = Number(event.target.value);
												if (value == Number.NaN)
													value = 0;

												dispatch(setValueToCart({item: item.catalog, value, images: item.images, wh: item.wh, price: item.price}));
											}}
										/>
									</Box>
								</FlexBox>
								<Divider />
							</Box>
						))}
					</Box>

					{/* ACTIONS */}
					<Box m="20px 0">
						<FlexBox m="20px 0">
							<Typography variant="h3" fontWeight="bold">ИТОГО</Typography>
							<Typography variant="h3" fontWeight="bold">{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(totalPrice)}</Typography>
						</FlexBox>
						<Button
							disabled={cart.length ===0}
							sx={{
								backgroundColor: theme.palette.primary[400],
								color: theme.palette.secondary.main,
								borderRadius: 0,
								minWidth: "100%",
								padding: "20px 40px",
								m: "20px 0",
							}}
							onClick={() => {
								navigate("/checkout");
								dispatch(setIsCartOpen({}));
							}}
						>
							Оформить
						</Button>
						<Button
							// disabled={cart.length ===0}
							sx={{
							backgroundColor: theme.palette.primary[400],
							color: theme.palette.secondary.main,
							borderRadius: 0,
							minWidth: "100%",
							padding: "20px 40px",
							m: "20px 0",
						}}
								onClick={() => {
									dispatch(clearBag());
								}}>
							Очистить корзину
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CartMenu;