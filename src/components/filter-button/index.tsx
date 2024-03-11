import { useStore } from "@/hooks/useStore";
import './index.css';

interface Props {
	status: SessionStatus;
}

const FilterButton: React.FC<Props> = (props) => {
	const store = useStore().mainStore

	const selected = store.statusFilter === props.status

	return (
		<button
			className={`filter-button ${selected ? "selected" : ""}`}
			onClick={() => store.updateStatus(props.status)}
			type="button"
		>
			{props.status}
		</button>
	);
};

export default FilterButton;
