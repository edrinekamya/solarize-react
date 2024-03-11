import { makeAutoObservable, reaction } from "mobx";
import { defaultSession, slideShow } from "../data";
import RootStore from "./root";
export const numOfSlides = Object.values(slideShow).length;

export default class SlideStore {
	session = defaultSession;
	isOnGoing = false;
	rootStore;
	saveHandler;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
		this.saveHandler = reaction(
			() => this.session.progress,
			(value) => {
				if (value > 2) {
					this.rootStore.mainStore.addSession({
						...this.session,
						lastOpened: new Date().toISOString(),
					});
				}
			}
		);
	}

	get currentSlide() {
		return slideShow[this.session.slideNumber];
	}

	get discountedCost() {
		const discount = this.session.paymentPlan
			? this.session.paymentPlan.discount
			: 0;
		return this.absoluteTotalCost * (1 - discount);
	}

	get costAndSavings() {
		let panelCost = 0;
		let panelOutput = 0;
		let addOnSavings = 0;
		let addOnCost = 0;
		let utilityCost = 0;

		for (const [id, customization] of Object.entries(
			this.session.customizations
		)) {
			const cost = customization.pricing ?? 0;
			const output = customization.output ?? 0;
			if (id.includes("choice")) {
				panelCost += cost;
				panelOutput += output;
			} else if (customization.savings) {
				addOnSavings += customization.savings;
				addOnCost += cost;
			} else {
				utilityCost += cost;
			}
		}
		return {
			panelCost,
			panelOutput,
			addOnSavings,
			addOnCost,
			utilityCost,
		};
	}

	get savingsAndROI() {
		// user information
		const electricalCost = this.session.electricityCost; // $/ kwh
		const sunlightHours = this.session.sunlightHours; //hrs
		const roofSize = this.session.solarSpace; // sq.mts

		const { panelCost, panelOutput, addOnSavings, addOnCost } =
			this.costAndSavings;

		// calculate energy production
		const baseEnergyProduction =
			panelOutput * sunlightHours * 365 * roofSize; // kwh/year
		const newEnergyProduction = baseEnergyProduction * addOnSavings; // kwh/year with add-ons

		// calculate savings
		const baseSavings = baseEnergyProduction * electricalCost; // $
		const newSavings = newEnergyProduction * electricalCost; // $

		// calculate ROI
		const baseROI = (baseSavings / panelCost) * 100; // %
		const newROI = (newSavings / (panelCost + addOnCost)) * 100; // %

		// return the values
		return {
			baseSavings: baseSavings.toFixed(2),
			baseROI: baseROI.toFixed(2) + "%",
			newSavings: newSavings.toFixed(2),
			newROI: newROI.toFixed(2) + "%",
		};
	}

	get absoluteTotalCost() {
		const { panelCost, utilityCost, addOnCost } = this.costAndSavings;
		return panelCost + utilityCost + addOnCost;
	}

	get isLast() {
		return this.currentSlide.type === "conclusion";
	}

	get hideNext() {
		return (
			this.currentSlide.type === "confirmation" ||
			this.session.slideNumber === numOfSlides - 1 ||
			(this.currentSlide.type === "choice" &&
				!this.session.customizations[
					`choice${this.session.slideNumber}`
				]) ||
			(this.currentSlide.type === "payment-plan" &&
				!this.session.paymentPlan) ||
			this.session.slideNumber > 10
		);
	}

	reset = () => {
		this.session = defaultSession;
	};

	updateStatus = (status: SessionStatus) => {
		this.session.status = status;
	};

	updateSunlightHours = (sunlightHours: number) => {
		this.session.sunlightHours = sunlightHours;
	};

	updateElectricityCost = (electricityCost: number) => {
		this.session.electricityCost = electricityCost;
	};
	updateSolarSpace = (solarSpace: number) => {
		this.session.solarSpace = solarSpace;
	};

	startNew = () => {
		this.reset();
		this.isOnGoing = true;
	};

	close = () => {
		this.isOnGoing = false;
	};

	startExisting = (session: UserSession) => {
		this.session = session;
		this.isOnGoing = true;
	};

	schedule = () => {
		this.session.status = "Scheduled";
		this.close();
	};

	goToSlide = (n: number) => {
		this.session.slideNumber = n;
	};

	updatePaymentPlan = (plan: PaymentPlan) => {
		this.session.paymentPlan = plan;
	};

	addCustomization = (
		customization: ICustomization,
		customizationId: string
	) => {
		const customizations = this.session.customizations;
		if (customizations[customizationId]?.id === customization.id) {
			delete customizations[customizationId];
		} else {
			customizations[customizationId] = customization;
		}
	};

	nextSlide = () => {
		this.session.slideNumber += 1;
		if (this.session.progress < this.session.slideNumber) {
			this.session.progress += 1;
		}
	};

	previousSlide = () => {
		this.session.slideNumber = Math.max(0, this.session.slideNumber - 1);
	};
}
