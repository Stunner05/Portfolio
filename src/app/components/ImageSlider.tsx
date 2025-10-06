import React, { useState, useEffect } from "react";

const ImageSlider = () => {
	const images = [
		"/image1.jpg", // replace with your own image path
		"/image2.jpg",
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000); // change every 3 seconds

		return () => clearInterval(interval); // cleanup
	}, [images.length]);

	return (
		<div className="w-full h-64 overflow-hidden relative">
			<img
				src={images[currentIndex]}
				alt="slideshow"
				className="w-full h-full object-cover transition-all duration-1000"
			/>
		</div>
	);
};

export default ImageSlider;
