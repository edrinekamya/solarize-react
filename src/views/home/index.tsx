import { Navigate } from "react-router-dom";
import Header from "@/components/header";
import MainContent from "@/components/main-content";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

const HomeView = observer(() => {
	const store = useStore();

	if (!store.authStore.agent) {
		return <Navigate to={`/login`} replace={true} />;
	}

	return (
		<main className="flex column">
			<Header />
			<MainContent />
		</main>
	);
});

export default HomeView;
