import AppLogo from "../../components/AppLogo";
import { solarizeCompany } from "../../data";
import './index.css'

const address = solarizeCompany.address;
const social = solarizeCompany.socialMedia;

const CompanySlide: React.FC = () => {
	return (
		<div className="company-slide column flex center">
			<AppLogo size={125} />
			<h1>Welcome to {solarizeCompany.companyName}</h1>
			<p className="mission-statement">
				{solarizeCompany.missionStatement}
			</p>
			<div className="company-details">
				<h2>Achievements</h2>
				<ul>
					{solarizeCompany.achievements.map(
						(achievement: string, index: number) => (
							<li key={index}>{achievement}</li>
						)
					)}
				</ul>
			</div>
			<section className="row socials gap center">
				{Object.entries(social).map(([key, value]) => (
					<div key={key} className="column center">
						<div key={value} className="social-icon center"></div>
					</div>
				))}
			</section>
			<div className="address">
				<section className="row gap">
					<span>{address.country}</span>|<span>{address.city}</span>
				</section>
				<span>
					<i>{address.street}</i>
				</span>
			</div>
		</div>
	);
};

export default CompanySlide;
