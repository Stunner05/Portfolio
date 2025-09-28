import React from "react";

const Services = () => {
	const services = [
		{
			id: "01",
			title: "Web Design",
			description:
				"Crafting visually stunning and user-friendly websites tailored to your brand identity.",
		},
		{
			id: "02",
			title: "SEO Optimiztion",
			description:
				"Building fast, scalable, and responsive web applications with modern technologies.",
		},
		{
			id: "03",
			title: "UI/UX Design",
			description:
				"Designing intuitive user interfaces and experiences that engage and delight users.",
		},
		{
			id: "04",
			title: "Mobile App Development",
			description:
				"Creating seamless mobile applications for iOS and Android with responsive designs.",
		},
		{
			id: "05",
			title: "Digital Marketing",
			description:
				"Boosting your online presence through targeted campaigns, social media strategies, and data-driven marketing solutions.",
		},
		{
			id: "06",
			title: "Branding",
			description:
				"Developing a strong brand identity with logos, graphics, and consistent design language.",
		},
	];

	return (
		<section>
			<div className="text-white py-20">
				<div className="container mx-auto flex flex-col md:flex-row">
					<div className=" md:w-1/4 pr-8 mb-12 md:mb-0">
						<h2 className="text-7xl text-gray-200 font-bold mb-10">Services</h2>
					</div>

					<div className="md:w-3/4">
						{services.map((service) => (
							<div key={service.id} className="mb-16 flex items-start">
								<div className="text-purple-300 font-bold text-5xl mr-6 ">
									{service.id}
								</div>
								<div>
									<h3 className="text-2xl font-bold mb-2 "></h3>
								<p className="text-purple-300">{service.description}</p>

								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
