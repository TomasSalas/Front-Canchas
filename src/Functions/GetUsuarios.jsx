export const GetUsuarios = async () => {
	const url = 'https://back-canchas-production.up.railway.app/usuarios';

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	const { error, data } = await response.json();

	return {
		error,
		data,
	};
};
