import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import "./index.css";

const Summary = observer(() => {
	const store = useStore().slideStore;

	const savings = store.savingsAndROI;

	return (
		<div className="confirmation flex gap column grid-center-content">
			<h3 className="grid-content-heading">Summary</h3>
			<section className="row spaced">
				<span>Savings</span>
				<p>{savings.baseSavings}</p>
			</section>
			<section className="row spaced">
				<span>Return on Investment</span>
				<p>{savings.baseROI}</p>
			</section>
			<h4>With Add-ons</h4>
			<section className="row spaced">
				<span>Savings</span>
				<p>{savings.newSavings}</p>
			</section>
			<section className="row spaced">
				<span>Return on Investment</span>
				<p>{savings.newROI}</p>
			</section>
			<p></p>
			<div className="buttons row center gap">
				<button onClick={store.close} className="no">
					No, Thank You
				</button>
				<button onClick={store.schedule} className="later bd">
					Maybe later
				</button>
				<button onClick={store.nextSlide} className="yes">
					Yes, I'm In
				</button>
			</div>
		</div>
	);
});

export default Summary;
