const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <footer className="relative top-40 md:top-62 xl:top-73 w-full mt-auto bg-black text-white text-center py-6 text-sm md:text-base shadow-inner">
        created by Abdul Aleem © {year} LeetLens.
      </footer>
    );
  };
  
export default Footer;