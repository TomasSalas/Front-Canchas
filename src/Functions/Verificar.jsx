import { isExpired, decodeToken } from 'react-jwt';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useStore } from '../Store/StoreData';

export const Verificar = () => {
	const navigate = useNavigate();
	const setAuth = useStore((state) => state.setAuth);
	const setCorreo = useStore((state) => state.setCorreo);
	const setIdusuario = useStore((state) => state.setIdusuario);
	const setUsuario = useStore((state) => state.setUsuario);

	const verificarToken = useCallback(() => {
		const getCookie = (name) => {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		};

		// Uso
		const tokenDocument = getCookie('token');
		console.log('Token:', tokenDocument);

		const token = Cookies.get('token');
		console.log('Token:', token);

		if (token) {
			const expired = isExpired(token);

			if (expired) {
				Cookies.remove('token');
				Cookies.remove('userData');
				navigate('/');
			} else {
				const decode = decodeToken(token);
				if (decode && decode.data) {
					setCorreo(decode.data.correo);
					setIdusuario(decode.data.idUsuario);
					setUsuario(decode.data.usuario);
					setAuth(true);
				} else {
					Cookies.remove('token');
					Cookies.remove('userData');
					setAuth(false);
					navigate('/');
				}
			}
		} else {
			Cookies.remove('token');
			Cookies.remove('userData');
			setAuth(false);
			navigate('/');
		}
	}, [navigate, setAuth, setCorreo, setIdusuario, setUsuario]);

	useEffect(() => {
		setTimeout(() => {
			verificarToken();
		}, 1000);
	}, [verificarToken]);

	return null;
};
