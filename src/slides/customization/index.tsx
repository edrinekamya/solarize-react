import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { slideShow } from "@/data";
import "./index.css";

export interface CustomizationSlideProps {
	slideNumber: number;
	session: UserSession;
}

const CustomizationSlide: FC<CustomizationSlideProps> = observer(
	({ slideNumber, session }) => {
		const currentSlide = slideShow[slideNumber];
		const allCustomizations = Object.values(
			currentSlide.customizations ?? {}
		);

		function generateKey(id: string) {
			return currentSlide.type === "customization"
				? id
				: `${currentSlide.type}${slideNumber}`;
		}

		return (
			allCustomizations && (
				<div className="grid-container customization">
					{allCustomizations.map((customization) => {
						const store = useStore().slideStore;
						const key = generateKey(customization.id)
						return (
							<div
								className={`grid-item column ${
									session.customizations[key]?.id == customization.id ? "selected" : ""
								}`}
								onClick={() =>
									store.addCustomization(customization, key)
								}
								key={customization.name}
							>
								{customization.image && (
									<img
										alt={customization.name}
										className="flex"
										src={customization.image}
									/>
								)}
								<div className="column info">
									<section className="row gap spaced">
										<h3>{customization.name}</h3>
										{customization.pricing &&
											(
												<p className="pricing">
													${customization.pricing}
												</p>
											)}
									</section>
									<span>{customization.description}</span>
								</div>
							</div>
						);
					})}
				</div>
			)
		);
	}
);

export default CustomizationSlide;
