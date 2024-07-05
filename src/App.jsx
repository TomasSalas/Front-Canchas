import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InicioSesion } from './Login';
import { Dashboard } from './Dashboard';
import { GestionUsuarios } from './GestionUsuarios';
import { CrearUsuario } from './CrearUsuario';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CrearArriendo } from './CrearArriendo';

export const App = () => {
	const theme = createTheme({
		palette: {
			customColor: {
				main: '#6c757d',
				contrastText: '#fff',
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<InicioSesion />} />
						<Route path="/inicio" element={<Dashboard />} />
						<Route path="/gestionar-usuarios" element={<GestionUsuarios />} />
						<Route path="/crear-usuario" element={<CrearUsuario />} />
						<Route path="/crear-arriendo" element={<CrearArriendo />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
};
