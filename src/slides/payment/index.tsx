import ErrorMessage from "@/components/error";
import { useStore } from "@/hooks/useStore";
import CreditCardPaymentForm from "../card-payment";
import MobilePaymentForm from "../mobile-payment";
import { observer } from "mobx-react-lite";

const PaymentSlide = observer(() => {
	const payment = useStore().paymentSore;

	return (
		<div className="flex column grid-center-content">
			<ErrorMessage error={payment.error} />
			<h2 className="grid-content-heading">
				{payment.paymentMethod === "Mobile"
					? "Mobile Money"
					: "Credit Card Payment"}
			</h2>
			{payment.paymentMethod === "Mobile" ? (
				<MobilePaymentForm />
			) : (
				<CreditCardPaymentForm />
			)}
		</div>
	);
});

export default PaymentSlide;
