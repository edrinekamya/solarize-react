import { createBrowserRouter } from "react-router-dom";
import LoginView from "./views/login";
import HomeView from "./views/home";

export const router = createBrowserRouter([
	{
		path: `/`,
		Component: HomeView,
	},
	{
		path: `/login`,
		Component: LoginView,
	},
]);
