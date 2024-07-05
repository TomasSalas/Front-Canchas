export const AgregarUsuario = async (item) => {
	const url = 'https://back-canchas-production.up.railway.app/crear-usuario';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
		credentials: 'include',
	});

	const { error, message } = await response.json();

	if (error == null) {
		return {
			error: false,
			result: message,
		};
	} else {
		return {
			error: true,
			result: message,
		};
	}
};
