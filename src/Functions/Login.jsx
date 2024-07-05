export const Login = async (item) => {
	const url = 'http://localhost:3000/iniciar-sesion';
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
