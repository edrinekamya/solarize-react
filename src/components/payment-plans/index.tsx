import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

const options = [
	{
		name: "One-time",
		discount: 0.18,
		description: "a one go",
		duration: 1,
	},
	{
		name: "Monthly (Recommended)",
		discount: 0.08,
		description: "per month for 12 months",
		duration: 12,
	},
	{
		name: "Weekly",
		discount: 0.02,
		description: "per week for 52 weeks",
		duration: 52,
	},
];

const PaymentPlan = observer(() => {
	const store = useStore().slideStore;
	const totalCost = store.absoluteTotalCost;

	return (
		<div className="grid-container payment-plan">
			{options.map((option) => (
				<div
					key={option.name}
					onClick={() => store.updatePaymentPlan(option)}
					className={`grid-item column ${
						store.session.paymentPlan?.name === option.name
							? "selected"
							: ""
					}`}
				>
					<p className="name">{option.name}</p>
					<code className="flex column">
						<div className="total row spaced">
							<p>Total Cost</p>
							<p>${store.absoluteTotalCost}</p>
						</div>
						<section className="row spaced discount">
							<p>Discount</p>
							<p>-{option.discount * 100}%</p>
						</section>
						<div className="total row spaced">
							<p>Gross Pay</p>
							<p>
								$
								{(totalCost * (1 - option.discount)).toFixed(2)}
							</p>
						</div>
					</code>
					<code className="frequency-amount">
						$
						{(
							(totalCost / option.duration) *
							(1 - option.discount)
						).toFixed(2)}
					</code>
					<span> Billed {option.description}</span>
				</div>
			))}
		</div>
	);
});

export default PaymentPlan;
