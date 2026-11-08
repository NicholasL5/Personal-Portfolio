import { lazy } from "react";
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import LazyMount from "./components/LazyMount.jsx";

// Below-the-fold sections: code is fetched and rendered only when they approach the viewport.
const Skills = lazy(() => import("./components/Skills.jsx"));
const History = lazy(() => import("./components/History.jsx"));
const Projects = lazy(() => import("./components/Projects.jsx"));

export default function App() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Header />
        <main>
          <Intro />
          <LazyMount minHeight="1400px"><Skills /></LazyMount>
          <LazyMount minHeight="900px"><History /></LazyMount>
          <LazyMount minHeight="900px"><Projects /></LazyMount>
        </main>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
