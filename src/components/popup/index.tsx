import {
	ReactNode,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import "./index.css";

export interface IPopup {
	toggle(): void;
}

export interface IPopupProps {
	trigger?: ReactNode;
	children?: ReactNode;
	onClose?(): void;
}

const Popup = forwardRef<IPopup, IPopupProps>(
	({ trigger, children, onClose }, ref) => {
		const [isPopupVisible, setIsPopupVisible] = useState(false);
		const popupButtonRef = useRef<HTMLDivElement | null>(null);
		const popupRef = useRef<HTMLDivElement | null>(null);

		const toggle = () => {
			setIsPopupVisible((prevState) => !prevState);
			if (!isPopupVisible) {
				positionPopup();
			}
		};

		const close = () => {
			setIsPopupVisible((prev) => !prev);
			onClose && onClose();
		};

		const positionPopup = () => {
			if (!popupButtonRef.current || !popupRef.current) return;
			const triggerRect = popupButtonRef.current.getBoundingClientRect();
			const popupRect = popupRef.current.getBoundingClientRect();
			if (triggerRect.left + popupRect.width > window.innerWidth) {
				popupRef.current.style.left =
					triggerRect.left -
					popupRect.width +
					triggerRect.width +
					"px";
			} else {
				popupRef.current.style.left = triggerRect.left + "px";
			}
			if (triggerRect.top + popupRect.height > window.innerHeight) {
				popupRef.current.style.top =
					triggerRect.top - popupRect.height + "px";
			} else {
				popupRef.current.style.top = triggerRect.bottom + "px";
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (
				isPopupVisible && // Add this condition
				popupRef.current &&
				!popupRef.current.contains(e.target as Node)
			) {
				close();
				console.log("OutSlide was clicked", isPopupVisible);
				e.stopPropagation();
			}
		};

		useEffect(() => {
			positionPopup();

			document.addEventListener("click", handleClickOutside, true);
			window.addEventListener("resize", positionPopup);

			return () => {
				document.removeEventListener("click", handleClickOutside);
				window.removeEventListener("resize", positionPopup);
			};
		});

		useImperativeHandle(ref, () => ({
			toggle,
		}));

		return (
			<div className="popup-container">
				<div
					ref={popupButtonRef}
					className="popup-trigger"
					onClick={toggle}
				>
					{trigger}
				</div>
				{isPopupVisible && (
					<div
						ref={popupRef}
						className="popup"
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</div>
				)}
			</div>
		);
	}
);

export default Popup;
