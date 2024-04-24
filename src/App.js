import Header from "./components/Header/Header";
import '../src/styles/partials/global.scss';
import Hero from "./components/Hero/Hero";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeatureCard />
      <Footer />
      

    </div>
  );
}

export default App;
