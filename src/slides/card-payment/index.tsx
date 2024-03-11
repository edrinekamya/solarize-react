import PaymentButton from "@/components/payment-button";
import { countryList } from "@/data";
import { useStore } from "@/hooks/useStore";
import { validateNumeric } from "@/util";
import { observer } from "mobx-react-lite";
import React from "react";
import './index.css';

const CardPaymentForm = observer(() => {
	const store = useStore().paymentSore;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		validateNumeric(event);
		const key = event.key;
		const value = (event.target as HTMLInputElement).value + key;
		const month = parseInt(value.slice(0, 2));
		const year = parseInt(value.slice(3));

		if (
			(value.length === 2 && month > 12) ||
			(value.length === 4 && year < 19)
		) {
			event.preventDefault();
		}
	};

	const processPayment = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const cardType = store.isAmex
			? "AMEX"
			: store.isMasterCard
			? "MASTERCARD"
			: "VISA";
		store.processPayment("Card", cardType);
	};

	return (
		<form onSubmit={processPayment} className="flex card-payment gap column">
			<section className="column gap-s">
				<p>Email</p>
				<input
					placeholder="john@example.com"
					value={store.email}
					className={
						store.email && !store.emailValid ? "invalid" : ""
					}
					required
					type="email"
					onChange={(e) => {
						store.setEmail(e.target.value);
					}}
				/>
			</section>
			<section className="gap-s column">
				<p>Card information</p>
				<section
					className={`card-container gap-s row ${
						!store.isCardEmpty && !store.isCardFormatValid
							? "invalid"
							: ""
					}`}
				>
					<input
						onKeyDown={handleKeyDown}
						maxLength={19}
						value={store.formattedCardNumber}
						className="card-number flex"
						required
						autoComplete="cc-number"
						placeholder="1234 1234 1234 1234"
						type="text"
						onChange={(e) => {
							store.setFormattedCardNumber(e.target.value);
						}}
					/>
					{store.isMasterCard && (
						<img
							className="logo"
							src="/src/assets/logo/card.png"
							alt=""
						/>
					)}
					{store.isVisa && (
						<img
							className="logo"
							src="/src/assets/logo/visa.png"
							alt=""
						/>
					)}
					{store.isAmex && (
						<img
							className="logo"
							src="/src/assets/logo/american-express.png"
							alt=""
						/>
					)}
				</section>
				<span
					className="danger"
					hidden={store.isCardEmpty || store.isCardFormatValid}
				>
					Invalid card number
				</span>
				<section className="flex cc-row row gap-s">
					<input
						className={`half ${
							store.formattedCcExp && !store.ccExpValid
								? "invalid"
								: ""
						}`}
						onKeyDown={handleKeyDown}
						maxLength={7}
						value={store.formattedCcExp}
						required
						autoComplete="cc-exp"
						placeholder="MM / YY"
						type="text"
						onChange={(e) => {
							store.setFormattedCcExp(e.target.value);
						}}
					/>
					<input
						className={`half ${
							store.cvc && !store.cvcValid ? "invalid" : ""
						}`}
						maxLength={3}
						onKeyDown={handleKeyDown}
						value={store.cvc}
						required
						autoComplete="cc-csc"
						placeholder="CVC"
						type="text"
						onChange={(e) => {
							store.setCvc(e.target.value);
						}}
					/>
				</section>
			</section>
			<section className="gap-s column">
				<p>Cardholder name</p>
				<input
					value={store.name}
					className={store.name && !store.nameValid ? "invalid" : ""}
					required
					autoComplete="cc-name"
					placeholder="Full name on card"
					type="text"
					onChange={(e) => {
						store.setName(e.target.value);
					}}
				/>
			</section>
			<section className="gap-s column country">
				<p>Country or region</p>
				<select
					title="Select country"
					value={store.country}
					className={
						store.country && !store.countryValid ? "invalid" : ""
					}
					required
					onChange={(e) => {
						store.setCountry(e.target.value);
					}}
				>
					{countryList.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
			</section>
			<PaymentButton isDisabled={!store.isFormValid} />
		</form>
	);
});

export default CardPaymentForm;
