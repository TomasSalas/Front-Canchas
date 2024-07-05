import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Store/StoreData';
import { AppBar, Toolbar, IconButton, Drawer, ListItemButton, List, ListItemText, Box, Menu, MenuItem, Button, ListItemIcon, Backdrop, CircularProgress, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from '../assets/logo.png';
import PropTypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import Cookies from 'js-cookie';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const drawerItems = [
	{
		text: 'Arriendos',
		icon: <AssessmentIcon />,
		path: '/inicio',
	},
	{
		text: 'Registrar Arriendo',
		icon: <MonetizationOnIcon />,
		path: '/crear-arriendo',
	},
	{
		text: 'Usuarios',
		icon: <GroupIcon />,
		path: '/gestionar-usuarios',
	},
];
const menuItems = [{ text: 'Cerrar Sesión', icon: <LogoutIcon color="error" /> }];

export const NavBarDrawer = (props) => {
	NavBarDrawer.propTypes = {
		name: PropTypes.string,
		rol: PropTypes.string,
	};

	const isDrawerOpen = useStore((state) => state.isDrawerOpen);
	const setisDrawerOpen = useStore((state) => state.setisDrawerOpen);
	const setAuth = useStore((state) => state.setAuth);

	const { name } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [openBack, setopenBack] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const handleDrawerToggle = () => {
		setisDrawerOpen(!isDrawerOpen);
	};

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = (index) => {
		const selectedItem = menuItems[index];

		if (selectedItem == undefined) {
			setAnchorEl(null);
			return;
		}

		if (selectedItem.text === 'Cerrar Sesión') {
			setopenBack(true);
			setAnchorEl(null);
			Cookies.remove('token');
			Cookies.remove('userData');
			setAuth(false);
			navigate('/');
		}
	};

	useEffect(() => {
		setisDrawerOpen(true);
	}, [setisDrawerOpen]);

	return (
		<div>
			<AppBar
				position="fixed"
				className="appBar"
				sx={{
					backgroundColor: '#f6f6f7',
					boxShadow: 'none',
					color: 'black',
					width: `calc(100% - ${isDrawerOpen ? 200 : 0}px)`,
					marginLeft: isDrawerOpen ? 200 : 0,
				}}
			>
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
						{!isDrawerOpen && <MenuIcon />}
					</IconButton>
					<Box sx={{ flexGrow: 1 }}>{!isDrawerOpen && <img src={logoImg} style={{ width: 70 }}></img>}</Box>
					<Button color="inherit" onClick={handleMenuOpen}>
						<PersonIcon sx={{ paddingRight: 2 }} /> Bienvenido {` ${name}`}
					</Button>
					<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleMenuClose(null)}>
						{menuItems.map((item, index) => (
							<MenuItem onClick={() => handleMenuClose(index)} key={index}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								{item.text}
							</MenuItem>
						))}
					</Menu>
				</Toolbar>
			</AppBar>

			<Drawer
				variant="persistent"
				anchor="left"
				open={isDrawerOpen}
				onClose={handleDrawerToggle}
				sx={{
					width: 250,
					boxShadow: 'none',
					'& .MuiDrawer-paper': {
						width: 200,
						backgroundColor: '#f6f6f7',
						height: '100vh',
						borderRight: 'none',
					},
				}}
			>
				<Paper sx={{ width: 200, backgroundColor: '#f6f6f7', height: '100vh' }}>
					<Box sx={{ backgroundColor: '#f6f6f7' }}>
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f7', width: '100%' }}>
							<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 1 }}>
									<img src={logoImg} style={{ width: 100 }} alt="Logo" />
								</Box>
								<Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
									{isDrawerOpen && (
										<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
											<KeyboardArrowLeftIcon />
										</IconButton>
									)}
								</Box>
							</Box>
						</Box>

						<List>
							{drawerItems.map((item, index) => {
								const isSelected = location.pathname === item.path;
								return (
									<ListItemButton key={index} component={Link} to={item.path}>
										<ListItemIcon sx={{ color: isSelected ? 'green' : 'inherit' }}>{item.icon}</ListItemIcon>
										<ListItemText primary={item.text} sx={{ color: isSelected ? 'green' : 'inherit' }} />
									</ListItemButton>
								);
							})}
						</List>
					</Box>
				</Paper>
			</Drawer>

			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBack}>
				<CircularProgress color="warning" />
			</Backdrop>
		</div>
	);
};
