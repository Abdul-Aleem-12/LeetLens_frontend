import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Intro from './home/intro';
import '../App.css';
import Searchbar from './home/Searchbar';
import Footer from './Footer';
import Analyze from "./analysis/Analyze";
import Docs from "./others/Docs";
import About from "./others/About";

function App() {
  console.log("app entered function");
  return (
    //<div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <div className='bg-black'>
      <div 
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 
                  w-[300px] h-[300px] blur-[100px] opacity-30 
                  sm:w-[400px] sm:h-[400px] sm:blur-[120px]
                  md:w-[500px] md:h-[500px] md:blur-[140px]
                  lg:w-[600px] lg:h-[600px] lg:blur-[150px]
                  bg-purple-700 pointer-events-none z-0
                  overflow-hidden "
      />

      <main className="relative z-10 flex flex-col flex-grow">

        <Navbar /> 
        <Routes>
          <Route path="/" element={[<Intro />,<Searchbar />]} />
          <Route path="/analyze/:username" element={<Analyze />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
