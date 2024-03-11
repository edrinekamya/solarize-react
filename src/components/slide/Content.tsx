import { slideShow } from "@/data";
import WhySolar from "@/slides/basics";
import Confirmation from "@/slides/confirmation";
import Customization, { CustomizationSlideProps } from "@/slides/customization";
import Introduction from "@/slides/introduction";
import Model from "@/slides/model";
import Payment from "@/slides/payment";
import ThankYou from "@/slides/thank-you";
import UserData from "@/slides/user-data";
import PaymentMethod from "../payment-method";
import PaymentPlans from "../payment-plans";
import "./Content.css";
import { observer } from "mobx-react-lite";

const SlideContent: React.FC<CustomizationSlideProps> = observer((props) => {
	const slide = slideShow[props.slideNumber];

	const renderSlide = (type: SlideType) => {
		switch (type) {
			case "introduction":
				return <Introduction />;
			case "basics":
				return <WhySolar />;
			case "form":
				return <UserData />;
			case "choice":
			case "customization":
				return (
					<Customization
						session={props.session}
						slideNumber={props.slideNumber}
					/>
				);
			case "confirmation":
				return <Confirmation />;
			case "visualization":
				return <Model />;
			case "payment-plan":
				return <PaymentPlans />;
			case "payment-method":
				return <PaymentMethod />;
			case "payment":
				return <Payment />;
			case "conclusion":
				return <ThankYou />;
			default:
				return null;
		}
	};

	return (
		<div className="slide-content-container column flex">
			{slide.type !== "introduction" && <h2>{slide.title}</h2>}
			{renderSlide(slide.type)}
		</div>
	);
});

export default SlideContent;
