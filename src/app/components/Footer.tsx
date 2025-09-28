import { a } from "framer-motion/client";
import React from "react";

import {
	AiFillGithub,
	AiOutlineTwitter,
	AiFillFacebook,
	AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
	const socialLinks = [
		{
			href: "https://github.com/",
			icon: <AiFillGithub />,
			label: "GitHub",
		},
		{
			href: "https://twitter.com/",
			icon: <AiOutlineTwitter />,
			label: "Twitter",
		},
		{
			href: "https://facebook.com/",
			icon: <AiFillFacebook />,
			label: "Facebook",
		},
		{
			href: "https://instagram.com/",
			icon: <AiFillInstagram />,
			label: "Instagram",
		},
	];

	return (
		<footer className="relative py-8 max-w-[1200px] mx-auto px-4">
			<div className="md:hidden absolute inset-0 overflow-hidden">
				<div className="absolute top-[30%] inset-0 md:hidden py-8 w-[100px] h-[100px] bg-gray-400  mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
				<div className="absolute top-[30%] w-[150px] h-[70px] bg-gray-400 left-1/4 md:hidden py-8 max-w-[1200px] mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2">
                </div>
				<div className="absolute top-[30%] left-1/4 w-[100px] h-[100px] bg-gray-400  md:hidden py-8 max-w-[1200px] mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
			</div>

			<div className="hidden md:block absolute inset-0 overflow-hidden">
				<div className="absolute top-[30%] inset-0 md:hidden py-8 w-[100px] h-[100px] bg-gray-400  mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
				<div className="absolute top-[30%] w-[100px] h-[100px] bg-gray-400 left-1/4 md:hidden py-8 max-w-[1200px] mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
				<div className="absolute top-[30%] left-1/4 w-[100px] h-[100px] bg-gray-400  md:hidden py-8 max-w-[1200px] mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
				<div className="absolute top-[30%] left-1/4 w-[100px] h-[100px] bg-gray-400 md:hidden py-8 max-w-[1200px] mx-auto px-4 -translate-x-1/2 -tansalate-y-1/2"></div>
			</div>

            <div className="relative z-10 text-center mt-8">
                <h1 className="hidden md:hidden text-9xl text-white opacity-10">
                    OFFICIAL <br /> PRESH
                </h1>
            </div>

            <div className="mt-12 flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
                <p className="text-gray-200">
                    2025. All rights reserved
                </p>
                <ul className = "flex flex-wwrap ">
                    {socialLinks.map(
                        ({href, icon, label}) => (
                            <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="text-gry-200 flex items-cneter justify-center w-10 h-10 rounded-full hover:text-gray-400 transition-colors"
                            >
                                

                                </a>
                        )
                    )}
                </ul>
            </div>

		</footer>
	);
};

export default Footer;
