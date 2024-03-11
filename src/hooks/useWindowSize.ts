import { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useLayoutEffect(() => {
		handleSize(); // Call handleSize on first load

		window.addEventListener("resize", handleSize); // Update window size when the window is resized

		return () => {
			window.removeEventListener("resize", handleSize); // Clean up event listener when the component is unmounted
		};
	}, []); // Empty dependency array ensures the effect is only run on mount and unmount

	return windowSize;
};
