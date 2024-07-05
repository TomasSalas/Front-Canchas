import { Backdrop, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import Logo from './assets/logo.png';
import { useForm } from 'react-hook-form';
import { Login } from './Functions/Login';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useStore } from './Store/StoreData';

export const InicioSesion = () => {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const isAuth = useStore((state) => state.isAuth);

	const IniciarSesion = async (items) => {
		setOpen(true);
		const { error, result } = await Login(items);
		if (!error) {
			navigate('/inicio');
			setOpen(false);
		} else {
			toast.error(result);
			setOpen(false);
		}
	};

	useEffect(() => {
		if (isAuth) {
			navigate('/inicio');
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
			navigate('/');
		}
	}, [isAuth, navigate]);

	return (
		<>
			<Toaster richColors />
			<Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', height: '90vh', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
				<img src={Logo} style={{ width: '70%' }} />
				<form onSubmit={handleSubmit(IniciarSesion)} style={{ width: '100%' }}>
					<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
						<TextField label="Correo" type="email" variant="outlined" fullWidth {...register('correo', { required: true })} />
						<TextField label="Contraseña" type="password" variant="outlined" fullWidth {...register('password', { required: true })} />
						<Button variant="contained" size="large" color="success" type="submit">
							Iniciar Sesión
						</Button>
					</Box>
				</form>
			</Container>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="success" />
			</Backdrop>
		</>
	);
};
