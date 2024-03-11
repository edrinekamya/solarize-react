import { RouterProvider } from "react-router-dom";
import "./App.css";
import Provider from "./stores/provider";
import { router } from "./router";
import { useStore } from "./hooks/useStore";
import { useEffect } from "react";

const RouterView = () => {
	const store = useStore();

	useEffect(() => {
		return () => {
			// store.slideStore.disposer();
		};
	}, [store]);

	return (
		<div className="App flex">
			<RouterProvider router={router} />
		</div>
	);
};

function App() {
	return (
		<Provider>
			<RouterView />
		</Provider>
	);
}

export default App;
