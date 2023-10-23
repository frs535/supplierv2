import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Copyright from "../../components/Copyright";
import {setLogin} from "../../state";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

const SignIn = () => {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const values = {
            login: data.get('login'),
            password: data.get('password'),
        }

        console.log(`REACT_APP_BASE_ADRESS: ${process.env.REACT_APP_BASE_ADRESS}`);

        const port = window.location.port === "3000"? process.env.REACT_APP_BASE_PORT: window.location.port;
        const url = `${window.location.protocol}//${window.location.hostname}:${port}`;
        console.log(`url: ${url}`);

        const loggedInResponse = await fetch( `${url}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const loggedIn = await loggedInResponse.json();

        if (loggedInResponse.status !== 200){
            setTitle("Ошибка входа")
            setMessage("Не верный лоин или пароль")
            setOpen(true);
            return;
        }

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/dashboard");
        }

    };

    return (
        <Container>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Учетная запись"
                        name="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" id="remembeMe" />}*/}
                    {/*    label="Запомнить"*/}
                    {/*/>*/}
                    <Button
                        color="primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Вход
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">*/}
                            {/*    Забыли пароль?*/}
                            {/*</Link>*/}
                        </Grid>
                        <Grid item>
                            {/*<Link href="#" variant="body2">*/}
                            {/*    {"Нет акаунта? Зарегистрироваться"}*/}
                            {/*</Link>*/}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default SignIn;