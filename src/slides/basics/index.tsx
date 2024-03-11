import { useState } from "react";
import { solarReasons } from "../../data";
import './index.css'

const WhySolar = () => {
	const [currentIndex, setCurrentIndex] = useState<number>();

	return (
		<div className="basics gap column">
			<div className="grid-container">
				{solarReasons.map((section, index) => (
					<div
						onClick={() =>
							setCurrentIndex(
								currentIndex === index ? undefined : index
							)
						}
						className={`grid-item column ${
							currentIndex === index ? "item-selected" : ""
						}`}
						key={index}
					>
						<h2>{section.title}</h2>
						<section className="row">
							<p>{section.description}</p>
							{currentIndex === index && (
								<div className="reasons">
									<ul>
										{solarReasons[index].merits.map(
											(m, key) => (
												<li key={key}>{m}</li>
											)
										)}
									</ul>
								</div>
							)}
						</section>
					</div>
				))}
			</div>
		</div>
	);
};

export default WhySolar;
