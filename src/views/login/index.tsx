import { PiSpinnerGapBold } from "react-icons/pi";
import { Navigate } from "react-router-dom";
import AppLogo from "@/components/AppLogo";
import ErrorMessage from "@/components/error";
import Spinner from "@/components/spinner";
import { useStore } from "@/hooks/useStore";

import "./index.css";

import { observer } from "mobx-react-lite";
import { useState } from "react";

const LoginView = observer(() => {
	const store = useStore().authStore;
	const [agentId, setAgentId] = useState("");

	if (store.agent) {
		return <Navigate to={"/"} replace={true} />;
	}

	return (
		<div className="auth-page flex center">
			<div className="auth-container">
				<ErrorMessage error={store.errorMessage} />
				<AppLogo />
				<h1 className="auth-title">Solarize</h1>
				<p className="auth-description">
					The ultimate app for solar energy management
				</p>
				<form
					onSubmit={(e) => {
						store.login(agentId);
						e.preventDefault();
					}}
				>
					<input
						type="text"
						value={agentId}
						onChange={(e) => setAgentId(e.target.value)}
						placeholder="Enter your agent ID"
						className="auth-input"
					/>
					<button
						disabled={store.loading || !agentId}
						type="submit"
						className="auth-button"
					>
						{store.loading && (
							<Spinner>
								<PiSpinnerGapBold />
							</Spinner>
						)}
						Login
					</button>
				</form>

				<p className="auth-helper">
					If you have forgotten your agent ID, please contact the
					company.
					<span className="auth-link">Learn more</span>
				</p>
			</div>
		</div>
	);
});

export default LoginView;
