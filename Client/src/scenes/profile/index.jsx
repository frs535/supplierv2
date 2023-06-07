import { useSelector} from "react-redux";
import Label from "../../components/Label";
import {Box, TextField, useTheme} from "@mui/material";
import {useEffect, useState} from "react";


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DataGrid} from "@mui/x-data-grid";

const Profile = () =>{
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const id = user._id;
    const [profile, setProfile] = useState(null);
    const token = useSelector((state)=>state.token);
    const [expanded, setExpanded] = useState(false);

    const columns = [
        {
            field: "presentation",
            headerName: "Наименование",
            flex: 0.3,
        },
        {
            field: "address",
            headerName: "Адрес",
            flex: 1,
        },
    ];

    const getProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}general/profile/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProfile(data);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Box m="1.5rem 2.5rem" sx={{ flexDirection: 'column'}}>
            {profile ? (
                <Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {profile.companyName}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Как с нами связаться</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box noValidate
                                 autoComplete="off"
                                 sx={{
                                     '& .MuiTextField-root': { m: 1, width: '25ch' },
                                 }}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Телефон (общий)"
                                    defaultValue={profile.phoneNumber}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Менеджер"
                                    defaultValue={profile.managerName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Телефон менеджера"
                                    defaultValue={profile.managerPhone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Электронная почта"
                                    defaultValue={profile.managerEmail}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Доставка</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Адреса доставки
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DataGrid
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: theme.palette.background.alt,
                                        color: theme.palette.secondary[100],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: theme.palette.primary.light,
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        backgroundColor: theme.palette.background.alt,
                                        color: theme.palette.secondary[100],
                                        borderTop: "none",
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${theme.palette.secondary[200]} !important`,
                                    },
                                }}
                                getRowId={(row) => row.address}
                                rows={profile.deliveryAddress || []}
                                columns={columns}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Ваши данные
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Как с вами связаться
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box noValidate
                                 autoComplete="off"
                                 sx={{
                                     '& .MuiTextField-root': { m: 1, width: '25ch' },
                                 }}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Имя"
                                    defaultValue={user.firstName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Фамиля"
                                    defaultValue={user.firstName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Должность"
                                    defaultValue={user.occupation}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Электронная почта"
                                    defaultValue={user.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Телефон"
                                    defaultValue={user.phoneNumber}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ) : (
                <>Loading...</>
                )
            }
        </Box>
    );
};

export  default  Profile;