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
import { fetchProjects } from "./api/admin/projects/routes";
import PageTracker from "./components/PageTracker";
export default async function Home() {

	const projects = await fetchProjects();

	return (
		<>
		<PageTracker page="Home" />
		<Navbar/>
			<Hero />
			<LogoAnimation />
			<About />
			<Portfolio projects = {projects} />
			<KeyMetrics />
			<Stack />
			<Services />
			<Contact />
			<Footer />
		</>
	);
}
