import { Verificar } from './Functions/Verificar';
import { NavBarDrawer } from './Componets/NavBarDrawer';
import { Autocomplete, Backdrop, Box, Button, CircularProgress, Container, TextField, Typography, useMediaQuery } from '@mui/material';
import { useStore } from './Store/StoreData';
import { Controller, useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es';
import { AgregarReserva } from './Functions/AgregarReserva';
import { useTheme } from '@mui/material/styles';
import { containerVariants } from './Helpers/VariantMotion';
import { motion } from 'framer-motion';

export const CrearArriendo = () => {
	const theme = useTheme();
	moment.updateLocale('es', {
		months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
		monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
		weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
		weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
		weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
	});

	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const isOpen = useStore((state) => state.isDrawerOpen);
	const setisDrawerOpen = useStore((state) => state.setisDrawerOpen);

	const {
		formState: { errors },
		control,
		register,
		handleSubmit,
	} = useForm();

	const storedData = localStorage.getItem('userData');
	const [open, setOpen] = useState(false);

	let Nombre = '';

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.Usuario;
	}

	const canchas = [
		{ id: 1, name: 'Futbolito 1' },
		{ id: 2, name: 'Futbolito 2' },
		{ id: 3, name: 'Futbolito 3' },
		{ id: 4, name: 'Padel 1' },
		{ id: 5, name: 'Padel 2' },
	];

	const crearArriendo = async (payload) => {
		setOpen(true);
		try {
			const FechaInicio = payload.Fecha_Inicio.format('YYYY-MM-DD');
			const HoraInicio = payload.Hora_Inicio.format('HH:mm');
			const HoraFinal = payload.Hora_Termino.format('HH:mm');
			const cancha = payload.canchas.id;
			const nombreArrendatario = payload.nombreArrendatario;
			const contactoArrendatario = payload.numeroArrendatario;
			const items = { FechaInicio, HoraInicio, HoraFinal, cancha, nombreArrendatario, contactoArrendatario };

			const { error, result } = await AgregarReserva(items);

			if (!error) {
				toast.success(result);
			} else {
				toast.error(result);
			}
		} catch {
			setOpen(false);
			toast.error('Error');
		} finally {
			setOpen(false);
		}
	};

	useEffect(() => {
		setisDrawerOpen(isMdUp);
	}, [setisDrawerOpen, isMdUp]);

	return (
		<>
			<Verificar />
			<Toaster richColors />
			<NavBarDrawer name={Nombre} />
			<motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
				<Container maxWidth="xxl" style={{ paddingTop: 90, paddingLeft: isOpen ? 220 : 20 }}>
					<form onSubmit={handleSubmit(crearArriendo)}>
						<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							<Box>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									Agendar Arriendo
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
								<LocalizationProvider dateAdapter={AdapterMoment} locale="es">
									<Controller
										name="Fecha_Inicio"
										control={control}
										defaultValue={null}
										rules={{
											validate: (value) => value !== null || 'Este campo es requerido',
										}}
										render={({ field }) => (
											<DatePicker
												{...field}
												label="Fecha Inicio"
												inputFormat="DD/MM/YYYY"
												sx={{ width: '100%' }}
												error={!!errors.Fecha_Inicio}
												helperText={errors.Fecha_Inicio ? errors.Fecha_Inicio.message : ' '}
												slotProps={{
													textField: {
														error: !!errors.Fecha_Inicio,
														helperText: errors.Fecha_Inicio ? errors.Fecha_Inicio.message : ' ',
													},
												}}
											/>
										)}
									/>
								</LocalizationProvider>

								<LocalizationProvider dateAdapter={AdapterMoment} locale="es">
									<Controller
										name="Hora_Inicio"
										control={control}
										defaultValue={null}
										rules={{
											validate: (value) => value !== null || 'Este campo es requerido',
										}}
										render={({ field }) => (
											<TimePicker
												{...field}
												label="Hora Inicio"
												inputFormat="HH:mm"
												ampm={false}
												sx={{ width: '100%' }}
												error={!!errors.Hora_Inicio}
												helperText={errors.Hora_Inicio ? errors.Hora_Inicio.message : ' '}
												slotProps={{
													textField: {
														error: !!errors.Hora_Inicio,
														helperText: errors.Hora_Inicio ? errors.Hora_Inicio.message : ' ',
													},
												}}
											/>
										)}
									/>
								</LocalizationProvider>

								<LocalizationProvider dateAdapter={AdapterMoment} locale="es">
									<Controller
										name="Hora_Termino"
										control={control}
										defaultValue={null}
										rules={{
											validate: (value) => value !== null || 'Este campo es requerido',
										}}
										render={({ field }) => (
											<TimePicker
												{...field}
												label="Hora Termino"
												inputFormat="HH:mm"
												ampm={false}
												sx={{ width: '100%' }}
												error={!!errors.Hora_Termino}
												helperText={errors.Hora_Termino ? errors.Hora_Termino.message : ' '}
												slotProps={{
													textField: {
														error: !!errors.Hora_Termino,
														helperText: errors.Hora_Termino ? errors.Hora_Termino.message : ' ',
													},
												}}
											/>
										)}
									/>
								</LocalizationProvider>
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
								<TextField fullWidth label="Nombre Arrendatario" {...register('nombreArrendatario', { required: 'Nombre es requerido' })} error={!!errors.nombreArrendatario} helperText={errors.nombreArrendatario ? errors.nombreArrendatario.message : ' '} />
								<TextField fullWidth type="number" label="Numero Contacto Arrendatario" {...register('numeroArrendatario', { required: 'Nombre es requerido' })} error={!!errors.numeroArrendatario} helperText={errors.numeroArrendatario ? errors.numeroArrendatario.message : ' '} />
							</Box>
							<Box>
								<Controller
									name="canchas"
									control={control}
									defaultValue={null}
									rules={{ required: 'Este campo es requerido' }}
									render={({ field }) => (
										<Autocomplete
											{...field}
											isOptionEqualToValue={(option, value) => option.id === value.id}
											onChange={(event, newValue) => {
												field.onChange(newValue);
											}}
											sx={{ width: '100%' }}
											options={canchas}
											noOptionsText="No existen resultados ..."
											getOptionLabel={(option) => String(option.name)}
											renderInput={(params) => <TextField {...params} label="Cancha" error={!!errors.canchas} helperText={errors.canchas ? 'Campo Obligatorio' : ' '} />}
										/>
									)}
								/>
							</Box>

							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button variant="contained" color="success" type="submit">
									Reservar
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
