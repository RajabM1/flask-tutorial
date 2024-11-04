import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useCategoryPage } from "../../../../hooks/category/useCategoryPage";
import SearchAppBar from "../../search/SearchBar";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function NavBar() {
    const { handleLogout } = useAuth();
    const { categories } = useCategoryPage();
    const navigate = useNavigate();
    const settings = [
        { label: "Profile", to: "#" },
        { label: "Whish List", to: "#" },
        { label: "Logout", onClick: () => handleLogout() },
    ];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenCart = () => {
        navigate("/cart");
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <AppBar
            position="static"
            sx={{
                color: "black",
                boxShadow: 3,
                backgroundColor: "white",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        NULL
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "small",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" }, mt: "20px" }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} onClick={handleCloseNavMenu}>
                                    <Link
                                        to={`/market/${category.name}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        NULL
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Button
                                onClick={handleOpenNavMenu}
                                variant="text"
                                sx={{ m: 2, color: "inherit" }}
                            >
                                All Categories
                                <KeyboardArrowDownIcon />
                            </Button>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    ml: 3,
                                }}
                            >
                                <SearchAppBar setSearchQuery={setSearchQuery} width="500px" />
                            </Box>
                        </Box>
                        <Menu
                            id="categories-menu"
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            MenuListProps={{ onMouseLeave: handleCloseNavMenu }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} onClick={handleCloseNavMenu}>
                                    <Link
                                        to={`/market/${category.name}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Tooltip title="Open Cart">
                                <IconButton
                                    onClick={handleOpenCart}
                                    sx={{
                                        p: { xs: 0.5, sm: 1 },
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: { xs: 24, sm: 32 },
                                            height: { xs: 24, sm: 32 },
                                        }}
                                    >
                                        <AddShoppingCartIcon fontSize="small" />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{
                                        p: { xs: 0.5, sm: 1 },
                                    }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                        sx={{
                                            width: { xs: 24, sm: 32 },
                                            height: { xs: 24, sm: 32 },
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Menu
                            sx={{ mt: "60px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.label}
                                    onClick={() => {
                                        if (setting.onClick) setting.onClick();
                                    }}
                                    component={setting.to ? Link : "div"}
                                    to={setting.to}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {setting.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;