import { auth, signOut } from "../config/Firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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
        <div className="flex gap-6 items-center">
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
    </nav>
  );
};

export default Navbar;
