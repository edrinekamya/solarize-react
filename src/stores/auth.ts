import { makeAutoObservable } from "mobx";
import RootStore from "./root";

const localStorageKey = "solarize/react/auth";

export default class AuthStore {
	errorMessage = "";
	loading = false;
	agent: IAgent | null =
		JSON.parse(localStorage.getItem(localStorageKey) ?? "null") || null;
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}

	updateAgent = (agent: IAgent) => {
		this.agent = agent;
		this.save(agent);
	};

	updateError = (error: string) => {
		this.errorMessage = error;
	};

	toggleLoading = () => {
		this.loading = !this.loading;
	};

	save = (agent: IAgent | null) => {
		localStorage.setItem(localStorageKey, JSON.stringify(agent));
	};

	async login(agentId: string) {
		this.toggleLoading();
		setTimeout(() => {
			if (agentId === "007") {
				this.updateAgent({
					id: agentId,
					name: "James Bond",
				});
				this.updateError("");
			} else {
				this.updateError("Sorry, you're not James Bond");
			}
			this.toggleLoading();
			setTimeout(() => {
				this.updateError("");
			}, 3000);
		}, 1000);
	}

	logout = () => {
		this.agent = null;
		this.save(null);
	};
}
