import Header from "./components/Header/Header";
import '../src/styles/partials/global.scss';
import Hero from "./components/Hero/Hero";
import FeatureCard from "./components/FeatureCard/FeatureCard";


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeatureCard />
      

    </div>
  );
}

export default App;
