import React, { useState } from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    SettingsOutlined,
    ArrowDropDownOutlined,
    ShoppingBagOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import {setLogout, setMode, setIsCartOpen} from "state";
import profileImage from "assets/profile.jpeg";
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
    Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen, }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const cart = useSelector((state) => state.global.cart);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const navigate = useNavigate();

    const handleClose = () =>
    {
        setAnchorEl(null);
        dispatch(
            setLogout()
        );
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    bgcolor: 'background.paper'}}
            >
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    {/*<IconButton onClick={() => dispatch(setMode())}>*/}
                    {/*    {theme.palette.mode === "dark" ? (*/}
                    {/*        <DarkModeOutlined sx={{ fontSize: "25px" }} />*/}
                    {/*    ) : (*/}
                    {/*        <LightModeOutlined sx={{ fontSize: "25px" }} />*/}
                    {/*    )}*/}
                    {/*</IconButton>*/}
                    {/*<IconButton onClick={() => navigate("/profile")}>*/}
                    {/*    <SettingsOutlined sx={{ fontSize: "25px" }} />*/}
                    {/*</IconButton>*/}

                    <Badge
                        badgeContent={cart.length}
                        color="primary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                            },
                        }}
                    >
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}
                        >
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;