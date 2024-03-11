import logo from "../logo.svg";

const AppLogo = ({ size = 125 }: { size?: number }) => (
	<img
		src={logo}
		width={size}
		height={size}
		className="App-logo"
		alt="logo"
	/>
);

export default AppLogo;