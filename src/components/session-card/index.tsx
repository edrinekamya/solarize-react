import { observer } from "mobx-react-lite";
import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";
import IconButton from "../icon-button";
import SlideContent from "../slide/Content";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useStore } from "@/hooks/useStore";
import { numOfSlides } from "@/stores/slide";
import "./index.css";

interface SessionCardProps {
	session: UserSession;
}

const TimeAgo: FC<{ dateString: string }> = ({ dateString }) => (
	<p>Last Updated {useTimeAgo(dateString)}</p>
);

const SessionCard: FC<SessionCardProps> = observer(({ session }) => {
	const store = useStore();

	return (
		<article className="session-card" onClick={() => store.slideStore.startExisting(session)}>
			<section className="flex column last-session">
				<div
					onClick={(e) => e.stopPropagation()}
					className="top row spaced"
				>
					<input
						type="text"
						placeholder="Untitled"
						value={session.customer}
						onChange={(e) =>
							store.mainStore.updateSessionName(
								e.target.value,
								session.id
							)
						}
						className="session-name"
					/>
					<IconButton
						onClick={() =>
							store.mainStore.deleteSession(session.id)
						}
					>
						<MdDeleteForever size={24} />
					</IconButton>
				</div>
				<SlideContent
					session={session}
					slideNumber={session.slideNumber}
				/>
			</section>
			<div className="session-info row spaced">
				<TimeAgo dateString={session.lastOpened} />
				<section>
					{session.status === "Active" && (
						<>
							<progress
								value={session.progress + 1}
								max={numOfSlides}
								className="session-progress-bar"
							></progress>
						{(((session.progress + 1) * 100) / numOfSlides).toFixed(0)}%
						</>
					)}
				</section>
			</div>
		</article>
	);
});

export default SessionCard;
