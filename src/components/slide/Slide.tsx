import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import SlideContent from "./Content";
import "./Slide.css";

interface Props {
	index: number;
}

const Slide: React.FC<Props> = observer(({ index }) => {
	const slideShow = useStore().slideStore;
	const { width: windowWidth } = useWindowSize();
	const translateX = (index - slideShow.session.slideNumber) * windowWidth;

	return (
		<div
			style={{
				transform: `translateX(${translateX}px)`,
				width: `${windowWidth}px`,
			}}
			className="slide column flex"
		>
			<SlideContent session={slideShow.session} slideNumber={index} />
		</div>
	);
});

export default Slide;
