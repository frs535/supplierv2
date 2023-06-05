import {Box, Typography, useTheme} from "@mui/material";
import React from "react";

export const Label = ({title, text}) => {
	const theme = useTheme();

	return (
		<Box m="1.5rem 2rem 1rem 3rem"
			 sx={{
				flexDirection: 'row',
				flexWrap: 'wrap',
			}}>
			<Typography
				variant="h5"
				color={theme.palette.secondary[100]}
				fontWeight="bold"
				sx={{ mb: "5px" }}
			>
				{title}
			</Typography>
			<Typography variant="h6" color={theme.palette.secondary[300]}>
				{text}
			</Typography>
		</Box>
	);
};

export default Label;