import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from 'react-jwt';
import { useStore } from '../Store/StoreData';

export const Verificar = () => {
	const navigate = useNavigate();
	const setAuth = useStore((state) => state.setAuth);
	const setCorreo = useStore((state) => state.setCorreo);
	const setIdusuario = useStore((state) => state.setIdusuario);
	const setUsuario = useStore((state) => state.setUsuario);

	useEffect(() => {
		const token = localStorage.getItem('dataUser');

		if (token) {
			const expired = isExpired(token);

			if (expired) {
				localStorage.removeItem('dataUser');
				localStorage.removeItem('userData');
				navigate('/');
			} else {
				const decode = decodeToken(token);
				if (decode && decode.data) {
					setCorreo(decode.data.correo);
					setIdusuario(decode.data.idUsuario);
					setUsuario(decode.data.usuario);
					setAuth(true);
				} else {
					localStorage.removeItem('dataUser');
					localStorage.removeItem('userData');
					setAuth(false);
					navigate('/');
				}
			}
		} else {
			localStorage.removeItem('dataUser');
			localStorage.removeItem('userData');
			setAuth(false);
			navigate('/');
		}
	}, [navigate, setAuth, setCorreo, setIdusuario, setUsuario]);

	return null;
};
