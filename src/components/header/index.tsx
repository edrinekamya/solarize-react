import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { MdLogout, MdSearch } from "react-icons/md";
import AppLogo from "../AppLogo";
import NotificationPopup from "../notifications";
import Popup from "../popup";
import "./index.css";

const ProfilePopupMenu = observer(() => {
	const store = useStore().authStore;
	const agent = store.agent;
	const initial = agent?.name && agent.name[0];
	return (
		<Popup
			trigger={
				<div className="center avatar">
					{initial}
				</div>
			}
		>
			<div className="column user-popup">
				<div className="center column top">
					<div className="big-avatar center">
						{initial}
					</div>
					<h2>#{agent?.id}</h2>
					<p>{agent?.name}</p>
				</div>
				<div className="bottom bd-top">
					<section onClick={store.logout} className="row gap logout">
						<MdLogout />
						<p>Logout</p>
					</section>
				</div>
			</div>
		</Popup>
	);
});

const Header = () => {
	return (
		<header className="home-header row spaced bd-bottom">
			<section className="row gap">
				<AppLogo size={32} />
				<span className="name">Solarize</span>
			</section>
			<section className="row bd search-bar">
				<MdSearch />
				<input type="text" placeholder="Find sessions" />
			</section>
			<div className="row gap">
				<NotificationPopup />
				<ProfilePopupMenu />
			</div>
		</header>
	);
};

export default Header;
