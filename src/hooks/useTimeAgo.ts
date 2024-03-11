import { useState, useEffect, useRef } from "react";

export function useTimeAgo(dateString: string) {
	const [timeAgo, setTimeAgo] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const intervalId = useRef<any>(null);

	useEffect(() => {
		const date = new Date(dateString);
		const update = () => {
			const secondsAgo = Math.floor(
				(new Date().getTime() - date.getTime()) / 1000
			);
			let timeAgoString;
			let nextUpdateInMilliseconds;

			if (secondsAgo < 60) {
				timeAgoString = "just now";
				nextUpdateInMilliseconds = 1000;
			} else if (secondsAgo < 3600) {
				const minutesAgo = Math.floor(secondsAgo / 60);
				timeAgoString = `${minutesAgo} minute${
					minutesAgo > 1 ? "s" : ""
				} ago`;
				nextUpdateInMilliseconds = 60 * 1000;
			} else if (secondsAgo < 86400) {
				const hoursAgo = Math.floor(secondsAgo / 3600);
				timeAgoString = `${hoursAgo} hour${
					hoursAgo > 1 ? "s" : ""
				} ago`;
				nextUpdateInMilliseconds = 60 * 60 * 1000;
			} else {
				const daysAgo = Math.floor(secondsAgo / 86400);
				timeAgoString = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
				nextUpdateInMilliseconds = 24 * 60 * 60 * 1000;
			}

			setTimeAgo(timeAgoString);
			intervalId.current = setTimeout(update, nextUpdateInMilliseconds);
		};

		update();

		return () => clearTimeout(intervalId.current);
	}, [dateString]);

	return timeAgo;
}
