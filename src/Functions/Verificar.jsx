/* eslint-disable no-unused-vars */
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from 'react-jwt';
import { useStore } from '../Store/StoreData';

export const Verificar = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const navigate = useNavigate();
	const setAuth = useStore((state) => state.setAuth);
	const setCorreo = useStore((state) => state.setCorreo);
	const setIdusuario = useStore((state) => state.setIdusuario);
	const setUsuario = useStore((state) => state.setUsuario);

	useEffect(() => {
		const token = cookies.token;
		console.log('Token:', token);

		if (token) {
			const expired = isExpired(token);

			if (expired) {
				removeCookie('token');
				removeCookie('userData');
				navigate('/');
			} else {
				const decode = decodeToken(token);
				if (decode && decode.data) {
					setCorreo(decode.data.correo);
					setIdusuario(decode.data.idUsuario);
					setUsuario(decode.data.usuario);
					setAuth(true);
				} else {
					removeCookie('token');
					removeCookie('userData');
					setAuth(false);
					navigate('/');
				}
			}
		} else {
			removeCookie('token');
			removeCookie('userData');
			setAuth(false);
			navigate('/');
		}
	}, [cookies, navigate, removeCookie, setAuth, setCorreo, setIdusuario, setUsuario]);

	return null;
};
