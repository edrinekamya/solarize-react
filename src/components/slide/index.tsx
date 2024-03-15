import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { MdArrowBackIos, MdArrowForward, MdCancel } from "react-icons/md";
import Slide from "./Slide";
import './index.css';

const Overlay = observer(() => {
	const store = useStore();
	return (
		(store.slideStore.session.status === "Complete" &&
		store.slideStore.currentSlide.type !== "conclusion") || store.paymentSore.isPaymentProgress ? (
			<div className="overlay"></div>
		) : null
	);
})

const SlideShow: React.FC = observer(() => {

	const store = useStore();
	const slideShow = store.slideStore;
	const slides = Array.from({ length: slideShow.session.progress + 1 });

	return slideShow.isOnGoing ? (
		<div className="slide-show column">
			<Overlay />
			<section className="slide-container flex">
				{slides.map((_, index) => (
					<Slide key={index} index={index} />
				))}
			</section>
			<section className="header absolute row spaced">
				{slideShow.session.slideNumber ? (
					<button onClick={slideShow.previousSlide}>
						<MdArrowBackIos />
						Back
					</button>
				) : (
					<span></span>
				)}
				<button onClick={slideShow.close}>
					Close
					<MdCancel />
				</button>
			</section>

			{!slideShow.isLast && (
				<section className="footer absolute row spaced">
					<section className="row slide-number-section">
						{slides.map((_, n) => (
							<article
								className={`slide-number center ${
									slideShow.session.slideNumber === n
										? "selected"
										: "dot"
								}`}
								key={n}
								onClick={() => slideShow.goToSlide(n)}
							>
								{n + 1}
							</article>
						))}
					</section>
					{!slideShow.hideNext && (
						<button onClick={slideShow.nextSlide}>
							Next
							<MdArrowForward />
						</button>
					)}
				</section>
			)}
		</div>
	) : null;
});

export default SlideShow;
