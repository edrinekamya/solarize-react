import { useStore } from "@/hooks/useStore";
import { generateRandomNotification } from "@/util";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import { MdDeleteForever, MdNotifications } from "react-icons/md";
import IconButton from "../icon-button";
import Popup, { IPopup } from "../popup";
import "./index.css";

const NotificationList = () => {
	const notifications = useStore().mainStore.notifications;
	return (
		<ul className="notification-list">
			{notifications.map(({ content, id, read }) => (
				<li className={read ? "" : "unread"} key={id}>
					{content}
				</li>
			))}
		</ul>
	);
};

const NotificationPopup = observer(() => {
	const notificationPopup = useRef<IPopup>(null);
	const store = useStore().mainStore;
	const unread = store.unread.length;
	const hasNotifications = store.notifications.length;

	const sendRandomNotification = useCallback(() => {
		// Schedule the next notification
		store.addNotification(generateRandomNotification());
		return setTimeout(sendRandomNotification, 5 * 60 * 1000);
	}, [store]);

	useEffect(() => {
		const timeoutId = sendRandomNotification();
		return () => clearTimeout(timeoutId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<Popup
			onClose={store.markAllAsRead}
			ref={notificationPopup}
			trigger={
				<div className="notification-icon">
					{unread > 0 && (
						<span className="notification-badge center">
							{unread}
						</span>
					)}
					<MdNotifications size={28} />
				</div>
			}
		>
			<div className="notification-popup column gap">
				<div className="bd-bottom row spaced">
					<h3 className="center">Notifications</h3>
					<IconButton onClick={store.clearNotifications}>
						<MdDeleteForever size={24} />
					</IconButton>
				</div>
				{hasNotifications ? (
					<NotificationList />
				) : (
					<div className="flex center">
						<span>No notifications</span>
					</div>
				)}
			</div>
		</Popup>
	);
});

export default NotificationPopup;
