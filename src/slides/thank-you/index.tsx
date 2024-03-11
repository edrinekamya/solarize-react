import React from "react";
import { useStore } from "@/hooks/useStore";

const ThankYou: React.FC = () => {
	const slideStore = useStore().slideStore;

	return (
		<div className="flex center column">
			<div className="column grid-center-content gap content">
				<h3 className="grid-content-heading">
					Thank you for choosing Solarize!
				</h3>
				<p>
					The agent will be sent instructions on how to proceed
					shortly
				</p>
				<button onClick={slideStore.close}>Close</button>
			</div>
		</div>
	);
};

export default ThankYou;
