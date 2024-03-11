import { useContext } from "react";
import RootStore from "../stores/root";
import { StoreContext } from "../stores/provider";

export const useStore = () => {
	return useContext(StoreContext) as RootStore;
};
