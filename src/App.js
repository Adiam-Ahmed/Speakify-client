import './App.scss';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from './components/Register/Register';




function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeatureCard />
      <Footer />
      <Login />
      <Register />
 
      

    </div>
  );
}

export default App;
