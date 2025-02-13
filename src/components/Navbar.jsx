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
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Nearby Hospitals
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/map" className="text-white">
            Map
          </Link>
          {user ? (
            <>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
