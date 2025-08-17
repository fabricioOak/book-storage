export function formatDateToISO(dateStr: string): string {
	if (dateStr.length !== 8 || isNaN(Number(dateStr))) {
		throw new Error("Invalid date format: expected ddMMyyyy (ex: 10021999)");
	}
	const day = dateStr.slice(0, 2);
	const month = dateStr.slice(2, 4);
	const year = dateStr.slice(4, 8);
	const isoDate = `${year}-${month}-${day}`;

	const dateObj = new Date(isoDate);
	if (isNaN(dateObj.getTime())) {
		throw new Error("Invalid date value");
	}

	return isoDate;
}
