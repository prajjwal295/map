import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center p-6">
      <h1 className="text-4xl font-extrabold drop-shadow-md mb-4 animate-fade-in">
        Find Nearby Hospitals Easily
      </h1>
      <p className="text-lg mb-6 max-w-md animate-fade-in">
        Get instant access to the nearest hospitals based on your location.
        Login to explore the best healthcare options near you.
      </p>

      <Link to="/map">
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
