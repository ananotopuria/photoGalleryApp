import { Link } from "react-router-dom";
import background from "./../../assets/background.png";

function HomePageComponents() {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${background})`,
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={backgroundStyle}
    >
      <div className="flex flex-col items-center justify-center text-white relative z-10 text-center px-6">
        <h1 className="text-6xl sm:text-7xl font-extrabold drop-shadow-md">
          Photo Gallery
        </h1>
        <p className="text-2xl sm:text-3xl mt-6 text-[#dea2a0] font-medium">
          Unlock a Universe of Visual Inspiration
        </p>

        <Link to="search">
          <button className="mt-10 px-6 py-3 text-lg font-semibold bg-[#dea2a0] text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-[#c48785] cursor-pointer">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomePageComponents;
