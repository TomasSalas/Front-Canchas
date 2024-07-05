export const FormatHora = (timeString) => {
	const [hours, minutes] = timeString.split(':');
	return `${hours}:${minutes}`;
};
