import { makeAutoObservable, toJS } from "mobx";
import RootStore from "./root";

const localStorageKey = 'solarize/react/sessions'

export const statusFilters: SessionStatus[] = [
	"Active",
	"Complete",
	"Scheduled",
];

export default class MainStore {
	sessions: Record<string, UserSession> =
		JSON.parse(localStorage.getItem(localStorageKey) ?? "{}") ||
		{};
	statusFilter: SessionStatus = "Active";
	search = "";
	notificationsMap: Record<string, INotification> = {};
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}

	save = () => {
		localStorage.setItem(localStorageKey, JSON.stringify(toJS(this.sessions)));
	}

	get notifications() {
		return Object.values(this.notificationsMap).reverse();
	}

	get hasUnreadImportant() {
		return this.unread.filter((x) => x.type === "important" && !x.read);
	}

	get unread() {
		return this.notifications.filter((x) => !x.read);
	}

	get allSessions() {
		return Object.values(this.sessions);
	}

	get filteredSessions() {
		return this.allSessions.filter(
			(s) =>
				s.status === this.statusFilter &&
				s.customer
					.toLocaleLowerCase()
					.includes(this.search.trim().toLocaleLowerCase())
		);
	}

	addSession = (session: UserSession) => {
		this.sessions[session.id] = session;
		this.save()
	};

	markAllAsRead = () => {
		for (const id in this.notificationsMap) {
			this.notificationsMap[id].read = true;
		}
	};

	addNotification = (notification: INotification) => {
		this.notificationsMap[notification.id] = notification;
	};

	clearNotifications = () => {
		this.notificationsMap = {};
	};

	deleteSession = (id:string) => {
		delete this.sessions[id];
	};

	updateSessionName = (name: string, id: string) => {
		this.sessions[id].customer = name;
	};

	updateStatus = (status: SessionStatus) => {
		this.statusFilter = status
	}
}
