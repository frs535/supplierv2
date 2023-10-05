import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardHeader,} from "@mui/material";
import { useGetDashboardQuery } from "state/api";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BusinessIcon from '@mui/icons-material/Business';
import TelegramIcon from '@mui/icons-material/Telegram';
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from "@mui/material/AccordionDetails";
import {setWarehouses, setTypeofPrice, setPartner} from "../../state";
import { useDispatch } from "react-redux";

const Dashboard = () => {

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
            <Grid container rowSpacing={2} columnSpacing={2} m={2}>
                <Grid item xs={3}>
                    <Card>
                        <CardHeader title="Ваш менеджер"/>
                        {data?.image?
                            <CardMedia
                                component="img"
                                alt="manager"
                                height="140"
                                image={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BASE_PORT}/${data?.image?.url256}`}
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                            />
                            :""}
                        <CardContent>
                            <Typography variant="h4" sx={{ mb: "20px" }}> {data.partner?.manager?.name?.toString()}</Typography>
                            <Stack direction="row" spacing={1}>
                                <LocalPhoneIcon/>
                                <Typography variant="h5"> {data.partner?.manager?.phone?.toString()}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <AlternateEmailIcon/>
                                <Typography variant="h5"> {data.partner?.manager?.email?.toString()}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card>
                        <CardHeader title="Наши контакты"/>
                        {data?.logo?
                            <CardMedia
                                component="img"
                                alt="manager"
                                height="100"
                                image={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BASE_PORT}/${data?.logo?.url256}`}
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                            />
                            :""}
                        <CardContent>
                            <Typography variant="h4" sx={{ mb: "10px" }}>{data?.settings?.name}</Typography>
                            <Typography variant="h4" sx={{ mb: "10px" }}> Время работы: {data?.settings?.workTime.toString()}</Typography>
                            {
                                Array.isArray(data?.settings?.phoneNumbers)?
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="h4">Наши телефоны</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            Array.isArray(data?.settings?.phoneNumbers) & data?.settings?.phoneNumbers.map(item=>
                                            {
                                                return (
                                                    <Stack direction="row" spacing={1}>
                                                        <LocalPhoneIcon/>
                                                        <Typography variant="h5"> {item?.number}</Typography>
                                                    </Stack>);
                                            })
                                        }
                                    </AccordionDetails>
                                </Accordion>:""
                            }
                            {
                                Array.isArray(data?.settings?.emails)?
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h4">Почта</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                Array.isArray(data?.settings?.emails) & data?.settings?.emails.map(item=>
                                                {
                                                    return (
                                                        <Stack direction="row" spacing={1}>
                                                            <AlternateEmailIcon/>
                                                            <Typography variant="h5"> {item}</Typography>
                                                        </Stack>);
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>:""
                            }
                            {
                                Array.isArray(data?.settings?.addresses)?
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h4">Адреса</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                Array.isArray(data?.settings?.addresses) & data?.settings?.addresses.map(item=>
                                                {
                                                    return (
                                                        <Stack direction="row" spacing={1}>
                                                            <BusinessIcon/>
                                                            <Typography variant="h5"> {item?.toString()}</Typography>
                                                        </Stack>);
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>:""
                            }
                            <Box sx={{ mt: "10px"}}>
                                <Stack direction="row" spacing={1}>
                                    <TelegramIcon/>
                                    <Typography variant="h4"> {data.settings?.telegram?.toString()}</Typography>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;