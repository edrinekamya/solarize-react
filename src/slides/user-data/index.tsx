import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import './index.css';

function toNumber(value: string) {
	const number = Number(value);
	return isNaN(number) ? 0 : number;
}

const UserData = observer(() => {
	const store = useStore();

	return (
		<div className="flex gap column user-form grid-center-content">
			<label>
				Average Energy Usage (kWh/year)
				<input
					value={store.slideStore.session.energyUsage}
					onChange={(e) =>
						store.slideStore.updateEnergyUsage(
							toNumber(e.target.value)
						)
					}
					type="number"
					min="0"
				/>
			</label>
			<label>
				Electricity Cost (per kWh)
				<input
					value={store.slideStore.session.electricityCost}
					onChange={(e) =>
						store.slideStore.updateElectricityCost(
							toNumber(e.target.value)
						)
					}
					type="number"
					min="0"
				/>
			</label>
			<label>
				Average Sunlight Hours
				<input
					value={store.slideStore.session.sunlightHours}
					onChange={(e) =>
						store.slideStore.updateSunlightHours(
							toNumber(e.target.value)
						)
					}
					type="number"
					min="0"
				/>
			</label>

			<label>
				Roof Size (Square meters)
				<input
					value={store.slideStore.session.solarSpace}
					onChange={(e) =>
						store.slideStore.updateSolarSpace(
							toNumber(e.target.value)
						)
					}
					type="number"
					min="0"
				/>
			</label>
		</div>
	);
});

export default UserData;
