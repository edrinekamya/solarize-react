import { FC } from "react";
import { FaCheckCircle, FaCogs, FaLock, FaSpinner } from "react-icons/fa"; // Assuming you're using react-icons
import { useStore } from "@/hooks/useStore";
import Spinner from "../spinner";
import { observer } from "mobx-react-lite";

const PaymentButton: FC<{ isDisabled: boolean }> = observer(({ isDisabled }) => {
	const store = useStore().paymentSore;

	const renderIcon = () => {
		switch (store.paymentStep) {
			case "Processing":
				return <FaSpinner className="spin" />;
			case "Success":
				return <FaCheckCircle />;
			case "Validating":
				return <FaCogs className="spin" />;
			case "Securing":
				return <FaLock className="spin" />;
			default:
				return null;
		}
	};

	return (
		<button disabled={isDisabled} type="submit" className="center gap">
			{store.isPaymentProgress && <Spinner>{renderIcon()}</Spinner>}
			{store.isPaymentProgress ? `${store.paymentStep} ...` : "Pay"}
		</button>
	);
});

export default PaymentButton;
