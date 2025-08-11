import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Intro from './home/intro';
import '../App.css';
import Searchbar from './home/Searchbar';
import Footer from './Footer';
import Analyze from "./analysis/Analyze"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

console.log("Hello mate, What are you doing in Dev Tab?");

function App() {
  return (
    
    <div className="bg-black relative min-h-screen overflow-hidden grad bad" >
    <main className="relative z-10 flex flex-col flex-grow">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Searchbar />
            </>
          }
        />
        <Route path="/analyze/:username" element={<Analyze />} />
      </Routes>
      <Footer />
    </main>
  </div>

  );
}

export default App;
