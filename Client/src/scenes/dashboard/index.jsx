import React from "react";
import {Box, Typography, Grid, Card, CardContent, CardMedia, CardHeader, useTheme,} from "@mui/material";
import { useGetDashboardQuery } from "state/api";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BusinessIcon from '@mui/icons-material/Business';
import Stack from "@mui/material/Stack";
import {setWarehouses, setTypeofPrice, setPartner} from "../../state";
import { useDispatch } from "react-redux";

const Dashboard = () => {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { data, error, isLoading , isError} = useGetDashboardQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (<div>
            <div>{error.status}</div>
            <div>{error.data.message}</div>
        </div>);
    }

    dispatch(setWarehouses(data.settings.warehauses))
    dispatch(setTypeofPrice(data.settings.priceOfTypes))
    dispatch(setPartner(data.partner))

    return (
        <Box sx={{ mt: "40px", ml: "20px", mr: "20px", flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {
                        !data?.image?.url256?
                            <img src={ `/static/${data?.image?.url256}`} width="100px"/>:
                            ""
                    }
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ mb: "40px", flexGrow: 1 }}>
                        <Typography variant="h7" color="secondary">Ваш менеджер</Typography>
                        <Typography variant="h4" >{data.partner?.manager?.name?.toString()}</Typography>
                    </Box>
                    <Box sx={{ mb: "20px", flexGrow: 1 }}>
                        <Typography variant="h7" color="secondary">Телефон</Typography>
                        <Stack direction="row">
                            <LocalPhoneIcon color="primary"/>
                            <Typography variant="h5" color="primary">{data.partner?.manager?.phone?.toString()}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ mb: "20px", flexGrow: 1 }}>
                        <Typography variant="h7" color="secondary">Почта</Typography>
                        <Stack direction="row">
                            <AlternateEmailIcon color="primary"/>
                            <Typography variant="h5" color="primary">{data.partner?.manager?.email?.toString()}</Typography>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} bgcolor="primary.main">
                    <Box sx={{ mt: "35px" }}>
                        <Typography color="primary.light" variant="h4" sx={{ mb: "10px" }}>{data?.settings?.name}</Typography>
                        <Typography color="primary.light" variant="h6" sx={{ mb: "10px" }}> Время работы: {data?.settings?.workTime.toString()}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} bgcolor="primary.main">
                    <Grid container spacing={2} sx={{ pb: "50px"}}>
                        <Grid item xc={4}>
                            <Typography variant="h7" color="secondary">Наши телефоны</Typography>
                            {
                                data?.settings?.phoneNumbers?.map(item=>
                                {
                                    return (
                                        <Stack direction="row" spacing={1}>
                                            <LocalPhoneIcon color="white"/>
                                            <Typography color="primary.light" variant="h5"> {item?.number}</Typography>
                                        </Stack>);
                                })
                            }
                        </Grid>
                        <Grid item xc={4}>
                            <Typography variant="h7" color="secondary">Почта</Typography>
                            {
                                data?.settings?.emails.map(item=>
                                {
                                    return (
                                        <Stack direction="row" spacing={1}>
                                            <AlternateEmailIcon color="white"/>
                                            <Typography color="primary.light" variant="h5"> {item}</Typography>
                                        </Stack>);
                                })
                            }
                        </Grid>
                        <Grid item xc={4}>
                            <Typography variant="h7" color="secondary">Адреса</Typography>
                            {
                                data?.settings?.addresses.map(item=>
                                {
                                    return (
                                        <Stack direction="row" spacing={1}>
                                            <BusinessIcon color="white"/>
                                            <Typography color="primary.light" variant="h5"> {item?.toString()}</Typography>
                                        </Stack>);
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;