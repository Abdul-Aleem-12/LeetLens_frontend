import { Search, ArrowRight, ArrowDown } from 'lucide-react';
import helper from '../src/assets/username.jpg';

const Searchbar = () => {
    return (
        <div className='flex flex-col'>
            <div className="z-10 flex flex-col xl:flex-row items-center w-full max-w-2xl mx-auto mt-6 px-4">
                <div className=" w-full relative top-15 md:top-20 xl:top-45">
                    <input
                    type="text"
                    placeholder="Enter your leetcode username..."
                    className="w-full pl-12 pr-4 py-2.5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-purple-500 bg-white text-black text:md md:text-2xl"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="ml-4 relative top-15 xl:top-45 xl:right-10 lg:top-30">
                    <button
                    onClick={() => console.log("Analyze clicked")}
                    //className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 xl:px-5 xl:py-3.5 md:py-4 rounded-2xl text-lg md:text-xl font-semibold transition-all"
                    className=" lg:top-0 clash-grotesk flex items-center gap-2 relative px-5 py-2 xl:px-8 xl:py-3.5 xl:top-0 md:top-10 top-6 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold text-lg md:text-xl shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                    Analyze <ArrowRight className="w-5 h-5" />
                    </button>
                </div >
            </div>
                    <div className='flex flex-col relative items-center justify-center'>
                    <div className='text-white relative top-30 xl:top-55 raleway-st-bold flex flex-row'>
                        <span>You can find your Username here in your Leetcode profile ⇓</span>
                    </div>  
                    <div>
                    <img src={helper} alt="image of username" className="z-0 h-80 w-80 relative mt-40 mb-3 xl:mt-60" />
                    </div>
                    
                    </div>
        </div>
    );
}
export default Searchbar;   