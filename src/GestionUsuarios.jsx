import { NavBarDrawer } from './Componets/NavBarDrawer';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { useStore } from './Store/StoreData';
import { Toaster, toast } from 'sonner';
import { GetUsuarios } from './Functions/GetUsuarios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { containerVariants } from './Helpers/VariantMotion';
import { motion } from 'framer-motion';

export const GestionUsuarios = () => {
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const isOpen = useStore((state) => state.isDrawerOpen);
	const setisDrawerOpen = useStore((state) => state.setisDrawerOpen);

	const navigate = useNavigate();
	const storedData = localStorage.getItem('userData');

	const [data, setData] = useState([]);
	let Nombre = '';

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.Usuario;
	}

	const getUsuarios = async () => {
		const { error, data } = await GetUsuarios();
		if (!error) {
			setData(data);
		} else {
			toast.error(data);
		}
	};

	const CrearUsuarios = () => {
		navigate('/crear-usuario');
	};

	useEffect(() => {
		getUsuarios();
	}, []);

	useEffect(() => {
		setisDrawerOpen(isMdUp);
	}, [setisDrawerOpen, isMdUp]);

	return (
		<>
			<Toaster richColors />
			<NavBarDrawer name={Nombre} />
			<motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
				<Container maxWidth="xxl" style={{ paddingTop: 90, paddingLeft: isOpen ? 220 : 20 }}>
					<Box sx={{ paddingBottom: 2 }}>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
							Gestionar Usuarios
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 1 }}>
						<Button variant="contained" color="customColor" onClick={() => CrearUsuarios()}>
							Crear Usuario
						</Button>
					</Box>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>ID</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>Nombre Usuario</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>Correo Usuario</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((item, index) => {
									return (
										<TableRow key={index}>
											<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.id_usuairo}</TableCell>
											<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.usuario}</TableCell>
											<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.correo}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</motion.div>
		</>
	);
};
