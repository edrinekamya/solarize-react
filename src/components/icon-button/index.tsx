import { ReactNode } from "react";
import "./index.css";

interface IconButtonProps {
	children: ReactNode;
	onClick?: () => void;
}

const IconButton = ({ children, onClick }: IconButtonProps) => (
	<div onClick={onClick}>{children}</div>
);

export default IconButton;
