import { useSelector} from "react-redux";
import {Box, TextField, useTheme} from "@mui/material";
import React, {useState} from "react";


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DataGrid} from "@mui/x-data-grid";
import {useGetProfileQuery} from "../../state/api";

const Profile = () =>{
    const theme = useTheme();
    const id = useSelector((state) => state.global.user._id);
    const user = useSelector((state) => state.global.user);
    const [expanded, setExpanded] = useState(false);

    const { data, error, isLoading, isError } = useGetProfileQuery(id);

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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return
        (<div>
            <div>{error.status}</div>
            <div>{error.data.message}</div>
        </div>);
    }

    if (data ===null){
        return <div>Нет данных</div>;
    }

    return (
        <Box m="1.5rem 2.5rem" sx={{ flexDirection: 'column'}}>
                <Box>
                    <Accordion expanded={'panel1' === expanded} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {data.companyName}
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
                                    defaultValue={data.phoneNumber}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Менеджер"
                                    defaultValue={data.managerName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Телефон менеджера"
                                    defaultValue={data.managerPhone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Электронная почта"
                                    defaultValue={data.managerEmail}
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
                                rows={data.deliveryAddress || []}
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
        </Box>
    );
};

export  default  Profile;