export const UpdatePago = async (item) => {
	const url = 'https://back-canchas-production.up.railway.app/update-pago';

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(item),
	});

	const { error, data } = await response.json();

	return {
		error,
		data,
	};
};
