import { notifications } from "./data";

export function camelToKebab(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
export function validateNumeric(event: React.KeyboardEvent<HTMLInputElement>) {
	const keyCode = event.keyCode;
	if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
		// keyCode 48-57 represents 0-9, and 8 is for backspace
		event.preventDefault();
	}
}

export function validateCardNumber(number: string) {
	let nCheck = 0;
	let bEven = false;
	for (let n = number.length - 1; n >= 0; n--) {
		const cDigit = number.charAt(n);
		let nDigit = parseInt(cDigit, 10);
		if (bEven && (nDigit *= 2) > 9) {
			nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	return nCheck % 10 === 0;
}

export function generateId() {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export function generateRandomNotification(): INotification {
	// Select a random notification
	const notification =
		notifications[Math.floor(Math.random() * notifications.length)];

	let content;
	if (notification.content.length === 1) {
		const points = Math.floor(Math.random() * 100) + 1;
		content = notification.content(String(points));
	} else if (notification.content.length === 2) {
		const customerName = `Customer ${Math.floor(Math.random() * 1000) + 1}`;
		const sessionId = `Session ${Math.floor(Math.random() * 10000) + 1}`;
		content = notification.content(customerName, sessionId);
	} else {
		content = notification.content();
	}

	return {
		id: generateId(),
		type: notification.isDynamic ? "important" : "push",
		timestamp: new Date().toISOString(),
		content: content,
	};
}
