export const Login = async (item) => {
	const url = 'https://back-canchas-production.up.railway.app/iniciar-sesion';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
		credentials: 'include',
	});

	const { error, message, data } = await response.json();

	if (error == null) {
		return {
			error: false,
			result: data,
		};
	} else {
		return {
			error: true,
			result: message,
		};
	}
};
