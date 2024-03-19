import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import Provider from "./stores/provider";

function App() {
	return (
		<Provider>
			<div className="App flex">
				<RouterProvider router={router} />
			</div>
		</Provider>
	);
}

export default App;
