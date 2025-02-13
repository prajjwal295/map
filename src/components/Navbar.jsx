import { auth, signOut } from "../config/Firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white font-extrabold text-2xl hover:text-blue-200 transition-all"
        >
          Nearby Hospitals
        </Link>

        {/* Hamburger Menu for mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar links and user section */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-all"
          >
            Home
          </Link>
          <Link
            to="/map"
            className="text-white hover:text-blue-200 transition-all"
          >
            Map
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 transition-all"
              >
                Logout
              </button>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} mt-4 px-4`}>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/map"
            className="text-white hover:text-blue-200 transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            Map
          </Link>

          {user ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 transition-all"
              >
                Logout
              </button>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
