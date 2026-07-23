import useLenis from "./hooks/useLenis.js";
import useGithubRepos from "./hooks/useGithubRepos.js";
import useGithubContributions from "./hooks/useGithubContributions.js";

import Backdrop from "./components/layout/Backdrop.jsx";
import CustomCursor from "./components/layout/CustomCursor.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Hero from "./components/sections/Hero.jsx";
import Terminal from "./components/sections/Terminal.jsx";
import About from "./components/sections/About.jsx";
import Skills from "./components/sections/Skills.jsx";
import Projects from "./components/sections/Projects.jsx";
import Activity from "./components/sections/Activity.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  useLenis();
  const { repos, status, lastSynced, resync } = useGithubRepos();
  const { data: contrib } = useGithubContributions();

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <CustomCursor />
      <Navbar syncStatus={status} />

      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <Hero repoCount={repos.length || undefined} contribCount={contrib?.total?.lastYear} />
        <Terminal repos={repos} resync={resync} />
        <About />
        <Skills />
        <Projects repos={repos} status={status} lastSynced={lastSynced} resync={resync} />
        <Activity />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
