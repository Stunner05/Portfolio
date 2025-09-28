import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import KeyMetrics from "./components/KeyMetrics";
import Navbar from "./components/Navbar";
import LogoAnimation from "./components/LogoAnimation";
import Stack from "./components/Stack";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function Home() {


	return (
		<>
		<Navbar/>
			<Hero />
			<LogoAnimation />
			<About />
			<Portfolio />
			<KeyMetrics />
			<Stack />
			<Services />
			<Contact />
			<Footer />
		</>
	);
}
