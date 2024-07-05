import { useEffect, useState, Fragment, useCallback } from 'react';
import { NavBarDrawer } from './Componets/NavBarDrawer';
import { GetArriendos } from './Functions/GetArriendos';
import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import { useStore } from './Store/StoreData';
import { FormatHora } from './Helpers/FormatHora';
import CancelIcon from '@mui/icons-material/Cancel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { FormatDate } from './Helpers/FormatDate';
import { Controller, useForm } from 'react-hook-form';
import { UpdatePago } from './Functions/UpdatePago';
import { Toaster, toast } from 'sonner';
import { Verificar } from './Functions/Verificar';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { containerVariants } from './Helpers/VariantMotion';

export const Dashboard = () => {
	const theme = useTheme();

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { control: controlCanchas } = useForm();
	const storedData = localStorage.getItem('userData');
	const [Arriendo, setArriendo] = useState([]);
	const [filteredArriendo, setFilteredArriendo] = useState([]);
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const isOpen = useStore((state) => state.isDrawerOpen);
	const setisDrawerOpen = useStore((state) => state.setisDrawerOpen);
	const [selectedCancha, setSelectedCancha] = useState({ id: 1, name: 'Futbolito 1' });
	const [idPagoSelect, setIdPago] = useState('');
	const [open, setOpen] = useState(false);

	let Nombre = '';

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.Usuario;
	}

	const Arriendos = useCallback(async () => {
		const { error, data } = await GetArriendos();
		if (!error) {
			setArriendo(data);
			setFilteredArriendo(data.filter((item) => item.id_cancha === selectedCancha.id));
		} else {
			setArriendo([]);
			setFilteredArriendo([]);
		}
	}, [selectedCancha.id]);

	const canchas = [
		{ id: 1, name: 'Futbolito 1' },
		{ id: 2, name: 'Futbolito 2' },
		{ id: 3, name: 'Futbolito 3' },
		{ id: 4, name: 'Padel 1' },
		{ id: 5, name: 'Padel 2' },
	];

	const pago = [
		{ id: 1, name: 'Efectivo' },
		{ id: 2, name: 'Tarjeta' },
	];

	const onSubmitPago = async (payload) => {
		const params = {
			idPago: payload.metodo_pago.id,
			idArriendo: idPagoSelect,
		};

		const { error, data } = await UpdatePago(params);

		if (!error) {
			Arriendos();
			setOpen(false);
			toast.success(data, { duration: 2000 });
		} else {
			toast.error(data, { duration: 2000 });
		}
	};

	const handleClickOpen = (arriendo) => {
		setIdPago(arriendo.id_arriendo);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setisDrawerOpen(isMdUp);
	}, [setisDrawerOpen, isMdUp]);

	useEffect(() => {
		Arriendos();
	}, [Arriendos]);

	const handleCanchaChange = (newValue) => {
		setSelectedCancha(newValue);
		setFilteredArriendo(Arriendo.filter((item) => item.id_cancha === newValue.id));
	};

	return (
		<>
			<Verificar />
			<Toaster richColors />
			<NavBarDrawer name={Nombre} />
			<motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
				<Container maxWidth="xxl" style={{ paddingTop: 90, paddingLeft: isOpen ? 220 : 20 }}>
					<Box>
						<Controller
							name="canchas"
							control={controlCanchas}
							defaultValue={selectedCancha}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.id === value.id}
									onChange={(event, newValue) => {
										field.onChange(newValue);
										handleCanchaChange(newValue);
									}}
									sx={{ width: '100%' }}
									options={canchas}
									noOptionsText="No existen resultados ..."
									getOptionLabel={(option) => option.name}
									renderInput={(params) => <TextField {...params} label="Canchas" error={!!errors.mes} helperText={errors.mes ? 'Campo Obligatorio' : ' '} />}
								/>
							)}
						/>
					</Box>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>N° ARRIENDO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>NOMBRE ARRIENDO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>NUMERO ARRIENDO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>CANCHA</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>FECHA</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>HORA INICIO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>HORA TERMINO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>PAGO REALIZADO</TableCell>
									<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap', background: '#F0F0F0' }}>ACCIÓN</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredArriendo.length > 0 ? (
									filteredArriendo.map((item, index) => (
										<Fragment key={index}>
											<TableRow>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.id_arriendo}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.nombre_arrendatario}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.numero_arrendatario}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{item.desc_cancha}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{FormatDate(item.fecha.split('T')[0])}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{FormatHora(item.hora_inicio)}</TableCell>
												<TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>{FormatHora(item.hora_termino)}</TableCell>
												<TableCell sx={{ textAlign: 'center' }}> {item.pagada == 0 ? <CancelIcon color="error" /> : <MonetizationOnIcon color="success" />}</TableCell>
												<TableCell>
													<Button color="primary" variant="contained" disabled={item.pagada == 1} onClick={() => handleClickOpen(item)}>
														Pagar
													</Button>
												</TableCell>
											</TableRow>
										</Fragment>
									))
								) : (
									<TableRow>
										<TableCell colSpan={8} align="center">
											<Typography variant="body2">No existen arriendos ⚽️ 🎾</Typography>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</motion.div>
			<motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
				<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
					<DialogTitle>Detalles del Pago</DialogTitle>
					<form onSubmit={handleSubmit(onSubmitPago)}>
						<DialogContent>
							<Box sx={{ paddingTop: 3 }}>
								<Controller
									name="metodo_pago"
									control={control}
									defaultValue={null}
									render={({ field }) => (
										<Autocomplete
											{...field}
											isOptionEqualToValue={(option, value) => option.id === value.id}
											onChange={(event, newValue) => {
												field.onChange(newValue);
											}}
											sx={{ width: '100%' }}
											options={pago}
											noOptionsText="No existen resultados ..."
											getOptionLabel={(option) => option.name}
											renderInput={(params) => <TextField {...params} label="Método de pago" error={!!errors.metodo_pago} helperText={errors.metodo_pago ? 'Campo Obligatorio' : ' '} />}
										/>
									)}
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
								<Button color="success" variant="contained" type="submit">
									Guardar Pago
								</Button>
								<Button color="primary" variant="contained" onClick={handleClose}>
									Cerrar
								</Button>
							</Box>
						</DialogActions>
					</form>
				</Dialog>
			</motion.div>
		</>
	);
};
