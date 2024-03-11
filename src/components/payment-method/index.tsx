import React from "react";
import { MdCardGiftcard, MdPhone } from "react-icons/md";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

const PaymentMethod: React.FC = observer(() => {
	const payment = useStore().paymentSore;

	return (
		<div className="grid-container">
			<div
				onClick={() => {
					payment.setPaymentMethod("Mobile");
				}}
				className={`center column grid-item ${
					payment.paymentMethod === "Mobile" ? "selected" : ""
				}`}
			>
				<MdPhone />
				<h2>Mobile Money</h2>
			</div>
			<div
				onClick={() => {
					payment.setPaymentMethod("Card");
				}}
				className={`center column grid-item ${
					payment.paymentMethod === "Card" ? "selected" : ""
				}`}
			>
				<MdCardGiftcard />
				<h2>Bank or Credit Card</h2>
			</div>
		</div>
	);
});

export default PaymentMethod;
