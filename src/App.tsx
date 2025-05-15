// import { Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar'
// import Intro from './intro'
// import './App.css'
// import Searchbar from './Searchbar'
// import Footer from './Footer'
// import Analyze from "./Analyze";
// import Docs from "./Docs";
// import About from "./About";

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen
//  bg-black relative overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute top-1/4 left-1/2 transform -translate-x-1/2 
//                   w-[300px] h-[300px] blur-[100px] opacity-30 
//                   sm:w-[400px] sm:h-[400px] sm:blur-[120px]
//                   md:w-[500px] md:h-[500px] md:blur-[140px]
//                   lg:w-[600px] lg:h-[600px] lg:blur-[150px]
//                   bg-purple-700 pointer-events-none z-0
//                   overflow-hidden"
//       />

//       {/* Content Section */}
//       <main className="relative z-10 flex flex-col flex-grow">
//         <Navbar />
//         <>
//       <Navbar /> {/* always visible */}
      
//       <Routes>
//         <Route path="/" element={<Searchbar />} />
//         <Route path="/analyze/:username" element={<Analyze />} />
//         <Route path="/docs" element={<Docs />} />
//         <Route path="/about" element={<About />} />
//         {/* Add more routes as needed */}
//       </Routes>
      
//       <Footer /> {/* always visible */}
//     </>
//       </main>
//       {/* Footer pushed to bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default App
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Intro from './intro';
import './App.css';
import Searchbar from './Searchbar';
import Footer from './Footer';
import Analyze from "./Analyze";
import Docs from "./Docs";
import About from "./About";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 
                  w-[300px] h-[300px] blur-[100px] opacity-30 
                  sm:w-[400px] sm:h-[400px] sm:blur-[120px]
                  md:w-[500px] md:h-[500px] md:blur-[140px]
                  lg:w-[600px] lg:h-[600px] lg:blur-[150px]
                  bg-purple-700 pointer-events-none z-0
                  overflow-hidden"
      />

      {/* Content Section */}
      <main className="relative z-10 flex flex-col flex-grow">
        <Navbar /> {/* Always visible */}

        {/* <Routes>
          <Route path="/" element={<Searchbar />} />
          <Route path="/analyze/:username" element={<Analyze />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
        </Routes> */}
        <Intro />
        <Searchbar />

        <Footer /> {/* Always visible */}
      </main>
    </div>
  );
}

export default App;
