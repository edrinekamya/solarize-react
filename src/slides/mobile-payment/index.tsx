import { useStore } from "@/hooks/useStore";
import { validateNumeric } from "../../util";
import { observer } from "mobx-react-lite";
import PaymentButton from "@/components/payment-button";
import "./index.css";

const MobilePaymentForm: React.FC = observer(() => {
	const store = useStore().paymentSore;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		validateNumeric(event);
		const value = (event.target as HTMLInputElement).value + event.key;
		if (!["0", "4", "5", "6", "7", "8"].includes(value.charAt(0))) {
			event.preventDefault();
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				store.processPayment(
					"Mobile",
					store.isAIRTEL ? "AIRTEL" : "MTN"
				);
			}}
			className="column flex gap"
		>
			<section className="gap-s column mobile-payment">
				<p>Phone number</p>
				<section
					className={`row number ${
						store.formattedNumber && !store.isValidMobileMoneyNumber
							? "invalid"
							: ""
					}`}
				>
					<span className="ellipsis">+256 7</span>
					<input
						onKeyDown={handleKeyDown}
						className="flex phone"
						id="mobileMoneyNumber"
						value={store.formattedNumber}
						onChange={(e) => {
							store.setFormattedNumber(e.target.value);
						}}
						placeholder="xxx xxxxxx"
						maxLength={9}
					/>
					<section className="row gap-s">
						{store.isAIRTEL && (
							<img
								className="logo"
								src="src/assets/logo/airtel-logo.png"
								alt=""
							/>
						)}
						{store.isMTN && (
							<img
								className="logo"
								src="src/assets/logo/mtn-logo.png"
								alt=""
							/>
						)}
					</section>
				</section>
			</section>
			<PaymentButton isDisabled={!store.isValidMobileMoneyNumber} />
		</form>
	);
});

export default MobilePaymentForm;
