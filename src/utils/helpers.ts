export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

function padTo2Digits(num: number) {
	return num.toString().padStart(2, "0");
}

export const formatDate = (date: Date) => {
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
	].join("-");
};
