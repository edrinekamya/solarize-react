import { MdAdd } from "react-icons/md";
import FilterButton from "../filter-button";
import { observer } from "mobx-react-lite";
import SlideShow from "../slide";
import SessionCard from "../session-card";
import { useStore } from "@/hooks/useStore";
import { statusFilters } from "@/stores/main";
import "./index.css";

const FilterButtonList = () => (
	<section className="row gap">
		{statusFilters.map((status) => (
			<FilterButton key={status} status={status} />
		))}
	</section>
);

const SessionList = observer(() => {
	const store = useStore();
	return (
		<section className="flex column bd-left main-content">
			{store.mainStore.allSessions.length ? (
				<section className="flex column">
					<header className="spaced row main-header bd-bottom">
						<FilterButtonList />
						<button
							onClick={store.slideStore.startNew}
							className="center"
							type="button"
						>
							<MdAdd />
							Session
						</button>
					</header>
					<section className="session-cards">
						{store.mainStore.filteredSessions.map((s) => (
							<SessionCard key={s.id} session={s} />
						))}
					</section>
				</section>
			) : (
				<section className="empty flex column center">
					<h1>No previous sessions</h1>
					<p>Start a new user session</p>
					<button
						type="button"
						onClick={store.slideStore.startNew}
						className="start-session-button"
					>
						<MdAdd />
						Session
					</button>
				</section>
			)}
		</section>
	);
});

const MainContent = () => {
	return (
		<>
			<SlideShow />
			<SessionList />
		</>
	);
};

export default MainContent;
