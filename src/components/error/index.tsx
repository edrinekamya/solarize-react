import { MdError } from "react-icons/md";
import './index.css'

const ErrorMessage = ({ error }: { error?: string }) =>
	error ? (
		<div className="error-container center">
			<div className="row gap error-message">
				<MdError />
				{error}
			</div>
		</div>
  ) : null
  
export default ErrorMessage