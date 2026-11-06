import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Skills from "./components/Skills.jsx";
import History from "./components/History.jsx";
import Writing from "./components/Writing.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Header />
        <main>
          <Intro />
          <Skills />
          <History />
          <Writing />
        </main>
      </div>
      <Footer />
    </>
  );
}
