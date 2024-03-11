declare global {
	type SessionStatus = "Active" | "Complete" | "Scheduled";
	type SlideType =
		| "introduction"
		| "basics"
		| "form"
		| "payment-plan"
		| "customization" // can choose one or not
		| "confirmation"
		| "visualization"
		| "payment"
		| "payment-method"
		| "services"
		| "conclusion"
		| "choice"; // compulsory to choose

  type PaymentMethod = "Card" | "Mobile";
  
	type PaymentStep =
		| "Form"
		| "Securing"
		| "Validating"
		| "Processing"
    | "Success";
  
	type PaymentProvider = "MTN" | "AIRTEL" | "VISA" | "MASTERCARD" | "AMEX";

	type Customizations = Record<string, ICustomization>;
	type SlideShow = Record<number, Slide>;

  interface ICustomization {
    id: string
		name: string;
		description: string;
		pricing?: number;
		output?: number;
		savings?: number;
		image?: string;
	}

	type PaymentPlan = {
		name: string;
		discount: number;
		description: string;
		duration: number;
	};

	interface Slide {
		title: string;
		type: SlideType;
		customizations?: ICustomization[]; // possible customizations to the previous slide
	}

	interface IAgent {
		id: string;
		name: string;
	}

	// Interface for user sessions
	interface UserSession {
		customizations: Customizations;
		slideNumber: number;
		progress: number;
		customer: string;
		paymentPlan?: PaymentPlan;
		status: SessionStatus;
		id: string;
		lastOpened: string;
		sunlightHours: number;
		electricityCost: number;
    solarSpace: number;
    energyUsage: number;
	}

	// Interface for notifications
	interface INotification {
		id: string;
		type: "email" | "push" | "in-app" | "important";
		content: string;
		timestamp: string;
		read?: boolean;
	}
}

export {};
