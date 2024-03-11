import { ReactNode, createContext } from "react";
import RootStore from "./root";

export const StoreContext = createContext<RootStore | null>(null);

const Provider = ({ children }: { children: ReactNode }) => {
	const store = new RootStore();
	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

export default Provider;
