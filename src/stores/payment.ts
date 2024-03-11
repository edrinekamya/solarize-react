import { makeAutoObservable } from "mobx";
import { generateId, validateCardNumber } from "../util";
import RootStore from "./root";
import { amexRegex, cardFormatRegex, cvcRegex, emailRegex, masterCardRegex, nameRegex, visaRegex } from "@/regex";
import { countryList } from "@/data";

const MTNIdentifiers = ["6", "7", "8"];
const AIRTELIdentifiers = ["0", "4", "5"];

export default class PaymentStore {
	discount = 0.3;
	isPaymentFormShown = false;
	paymentMethod = "Card";
	paymentStep = "Form";
	paymentMessage = "";
	error = "";
	phoneNumber = "";
	email = "";
	cvc = "";
	name = "";
	cardNumber = "";
	country = "Uganda";
	ccExp = "";
	isPaymentProgress = false;
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}

	get fullNumber() {
		return "+2567" + this.phoneNumber;
	}

	get isMTN() {
		return MTNIdentifiers.includes(this.phoneNumber.charAt(0));
	}

	get isAIRTEL() {
		return AIRTELIdentifiers.includes(this.phoneNumber.charAt(0));
	}

	get isEmpty() {
		return !this.phoneNumber;
	}

	get isValidMobileMoneyNumber() {
		return !this.isEmpty && this.phoneNumber.length === 8;
	}

	get formattedNumber() {
		return this.phoneNumber.replace(/^(.{2})/, "$1 ");
	}

	get formattedCcExp() {
		return this.ccExp.replace(/^(.{2})/, "$1 / ");
	}

	get formattedCardNumber() {
		return this.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
	}

	get isCardEmpty() {
		return !this.cardNumber;
	}

	get isMasterCard() {
		return this.isCardEmpty || masterCardRegex.test(this.cardNumber);
	}

	get isVisa() {
		return this.isCardEmpty || visaRegex.test(this.cardNumber);
	}

	get isAmex() {
		return this.isCardEmpty || amexRegex.test(this.cardNumber);
	}

	get emailValid() {
		return emailRegex.test(this.email);
	}

	get ccExpValid() {
		return this.ccExp.length === 4;
	}

	get cvcValid() {
		return cvcRegex.test(this.cvc);
	}

	get nameValid() {
		return nameRegex.test(this.name);
	}

	get countryValid() {
		return countryList.includes(this.country);
	}

	get isCardFormatValid() {
		return (
			cardFormatRegex.test(this.formattedCardNumber) &&
			(this.isAmex || this.isMasterCard || this.isVisa) &&
			validateCardNumber(this.cardNumber)
		);
	}

	get isFormValid() {
		return (
			this.emailValid &&
			this.ccExpValid &&
			this.cvcValid &&
			this.nameValid &&
			this.countryValid &&
			this.isCardFormatValid
		);
	}

	setEmail = (value: string) => {
		this.email = value;
	};

	setCvc = (value: string) => {
		this.cvc = value;
	};

	setName = (value: string) => {
		this.name = value;
	};

	setCountry = (value: string) => {
		this.country = value;
	};

	setFormattedCcExp = (value: string) => {
		this.ccExp = value.replace(/[^0-9]/g, "");
	};

	setFormattedNumber(value: string) {
		this.phoneNumber = value.replace(/\s/g, "");
	}

	setFormattedCardNumber = (value: string) => {
		this.cardNumber = value.replace(/\s/g, "");
	};

	setPaymentMethod(paymentMethod: PaymentMethod) {
		this.paymentMethod = paymentMethod
	}

	sendError = (error: string) => {
		this.error = error;
		this.paymentStep = "Form";
		this.isPaymentProgress = false;
		setTimeout(() => {
			this.resetError();
		}, 3000);
	};

	updateStep = (step: string, message: string) => {
		this.paymentStep = step;
		this.paymentMessage = message;
	};

	resetError = () => {
		this.error = "";
	};

	setPaymentInProgress = (value: boolean) => {
		this.isPaymentProgress = value;
	};

	reset = () => {
		this.paymentStep = "Form";
		this.error = "";
		this.isPaymentFormShown = false;
		this.isPaymentProgress = false;
	};

	async processPayment(method: PaymentMethod, provider: PaymentProvider) {
		try {
			this.resetError();
			this.setPaymentInProgress(true);
			const isMobile = method === "Mobile";

			// Securing
			this.updateStep(
				"Securing",
				"Be patient while we secure your payment..."
			);
			await new Promise((resolve) => setTimeout(resolve, 3000));

			// Validating(server-side)
			this.updateStep(
				"Validating",
				isMobile
					? `Validating your phone number...`
					: "Validating provided credit card information..."
			);
			await new Promise((resolve) => setTimeout(resolve, 3000));

			const isValid = Math.random() > 0.5;
			if (!isValid) {
				this.sendError(
					`${
						isMobile
							? `${provider} failed to validate your phone number`
							: "Your card could be invalid, expired or not active"
					}.`
				);
				return;
			}

			// Processing
			this.updateStep("Processing", "Processing your payment...");
			await new Promise((resolve) => setTimeout(resolve, 3000));

			const isProcessed = Math.random() > 0.5;
			if (!isProcessed) {
				this.sendError("Insufficient funds to complete your payment.");
				return;
			}

			// Success, reset state
			this.updateStep("Success", "Payment was processed successfully");
			this.rootStore.slideStore.updateStatus("Complete");
			await new Promise((resolve) => setTimeout(resolve, 1000));
			this.rootStore.slideStore.nextSlide(); // Uncomment and adjust as necessary

			// Simulate sending notifications
			this.rootStore.mainStore.addNotification({
				// Uncomment and adjust as necessary
				id: generateId(),
				type: "important",
				timestamp: new Date().toISOString(),
				content:
					"The previous session has been completed successfully. An installation of the equipment purchased has been scheduled for 25/04/2024. Please advise the customer accordingly",
			});

			this.reset();
		} catch (error) {
			this.sendError(
				"An unexpected error occurred during the payment process"
			);
		} finally {
			this.setPaymentInProgress(false);
		}
	}
}
