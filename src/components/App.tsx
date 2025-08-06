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
    //   <div className='bg-black'>
    //   <div 
    //     className="absolute top-1/4 left-1/2 transform -translate-x-1/2 
    //               w-[300px] h-[300px] blur-[100px] opacity-30 
    //               sm:w-[400px] sm:h-[400px] sm:blur-[120px]
    //               md:w-[500px] md:h-[500px] md:blur-[140px]
    //               lg:w-[600px] lg:h-[600px] lg:blur-[150px]
    //               bg-purple-700 pointer-events-none z-0
    //               overflow-hidden "
    //   />

    //   <main className="relative z-10 flex flex-col flex-grow">

    //     <Navbar /> 
    //     <Routes>
    //       <Route path="/" element={[<Intro />,<Searchbar />]} />
    //       <Route path="/analyze/:username" element={<Analyze />} />
    //     </Routes>
    //     <Footer />
    //   </main>
    // </div>
      <div className="bg-black relative min-h-screen overflow-hidden grad bad" >
    {/* Gradient background images */}
    {/* <img
      src="/first.png"
      alt="Background Gradient"
      className="absolute mt-20 top-0 left-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none"
    />
    <img
      src="/second.png"
      alt="Background Layer"
      className="absolute my-10 top-0 left-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
    /> */}


    {/* App Content */}
    <main className="relative z-10 flex flex-col flex-grow">
      <Navbar />
      <Routes>
        <Route path="/" element={[<Intro />, <Searchbar />]} />
        <Route path="/analyze/:username" element={<Analyze />} />
        
      </Routes>
      <Footer />
    </main>
  </div>

  );
}

export default App;
