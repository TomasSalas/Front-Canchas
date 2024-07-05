import { NavBarDrawer } from './Componets/NavBarDrawer';
import { Backdrop, Box, Button, CircularProgress, Container, TextField, Typography, useMediaQuery } from '@mui/material';
import { useStore } from './Store/StoreData';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { AgregarUsuario } from './Functions/AgregarUsuario';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { containerVariants } from './Helpers/VariantMotion';
import { motion } from 'framer-motion';

export const CrearUsuario = () => {
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const isOpen = useStore((state) => state.isDrawerOpen);
	const setisDrawerOpen = useStore((state) => state.setisDrawerOpen);

	const navigate = useNavigate();
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm();

	const storedData = localStorage.getItem('userData');
	const [open, setOpen] = useState(false);

	let Nombre = '';

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.Usuario;
	}

	const crearUsuario = async (payload) => {
		setOpen(true);
		try {
			const { error, result } = await AgregarUsuario(payload);
			if (!error) {
				toast.success(result, { duration: 3000 });
				reset();
				setTimeout(() => {
					navigate('/gestionar-usuarios');
				}, 1000);
			} else {
				toast.error(result, { duration: 3000 });
			}
		} finally {
			setOpen(false);
		}
	};

	useEffect(() => {
		setisDrawerOpen(isMdUp);
	}, [setisDrawerOpen, isMdUp]);

	return (
		<>
			<Toaster richColors />
			<NavBarDrawer name={Nombre} />
			<motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
				<Container maxWidth="xxl" style={{ paddingTop: 90, paddingLeft: isOpen ? 220 : 20 }}>
					<form onSubmit={handleSubmit(crearUsuario)}>
						<Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Box>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									Agregar Usuario
								</Typography>
							</Box>
							<TextField label="Nombre" {...register('usuario', { required: 'Nombre es requerido' })} error={!!errors.usuario} helperText={errors.usuario ? errors.usuario.message : ' '} />
							<TextField label="Correo" type="email" {...register('correo', { required: 'Correo es requerido' })} error={!!errors.correo} helperText={errors.correo ? errors.correo.message : ' '} />
							<TextField label="Contraseña" type="password" {...register('password', { required: 'Contraseña es requerida' })} error={!!errors.password} helperText={errors.password ? errors.password.message : ' '} />
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button variant="contained" color="success" type="submit">
									Crear Usuario
								</Button>
							</Box>
						</Container>
					</form>
				</Container>
			</motion.div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="success" />
			</Backdrop>
		</>
	);
};
