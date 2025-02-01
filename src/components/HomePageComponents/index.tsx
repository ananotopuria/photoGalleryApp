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
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      <div className="flex flex-col items-center justify-center font-bold text-white relative z-10 text-center">
        <h1 className="text-6xl font-semibold block">Photo Gallery</h1>
        <p className="ext-2xl py-5 block font-bold text-2xl mt-8 text-[#dea2a0]">
          Unlock a Universe of Visual Inspiration
        </p>
        <Link to="search">
          <button className="cursor-pointer my-[2rem] w-[130px] h-[40px] bg-[#] rounded-lg text-white underline hover:no-underline hover:translate-y-1 ">
            Explore now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomePageComponents;
