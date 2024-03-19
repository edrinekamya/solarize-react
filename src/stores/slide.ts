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
			() => ({ ...this.session }),
			(value) => {
				if (value.progress > 2) {
					this.rootStore.mainStore.addSession({
						...value,
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
		// User information
		const electricalCost = this.session.electricityCost; // $/kWh
		const sunlightHours = this.session.sunlightHours; // hrs
		const roofSize = this.session.solarSpace; // sq.mts
		const energyUsage = this.session.energyUsage; // kWh

		const { panelCost, panelOutput, addOnSavings, addOnCost } =
			this.costAndSavings;

		// Calculate energy production
		const baseEnergyProduction =
			(panelOutput / 1000/ 24) * sunlightHours * 365 * roofSize; // kWh/year
		const newEnergyProduction = baseEnergyProduction * (1 + addOnSavings); // kWh/year with add-ons

		// Calculate savings
		const baseSavings =
			Math.abs((energyUsage - baseEnergyProduction) * electricalCost); // $
		const newSavings = Math.abs(
			(energyUsage - newEnergyProduction) * electricalCost
		); // $

		// Calculate ROI
		const baseROI = (baseSavings / panelCost) * 100; // %
		const newROI = (newSavings / (panelCost + addOnCost)) * 100; // %

		// Return the values
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

	updateEnergyUsage = (value: number) => {
		this.session.energyUsage = value;
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
