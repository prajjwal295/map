import { auth, provider, signInWithPopup } from "../config/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user));
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center text-gray-900">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 animate-fade-in">
          Welcome Back!
        </h1>
        <p className="text-lg text-gray-600 mb-6 animate-fade-in">
          Sign in with your Google account to access nearby hospitals and more.
        </p>

        {user ? (
          <p className="text-green-600 font-semibold">
            You are already logged in.
          </p>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <img src={logo} alt="Google Logo" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        )}

        <p className="mt-4 text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <span className="text-blue-500 cursor-pointer">
            Terms & Conditions
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
