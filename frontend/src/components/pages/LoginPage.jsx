import React, { useContext, useState, useEffect } from "react";
import GeneralButton from "../general/GeneralButton.jsx";
// React Router Dom
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import API_BASE from "../../constants.js";
import UserDataContext from "../../../context/UserDataContext.jsx";

/**
 * @summary     Login page, redirects to MS Login
 * @exports     LoginPage
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  //Use state hooks
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [mode, setMode] = React.useState("login");
  const [showPassword, setShowPassword] = React.useState(false);


  
  const signIn = async () => {

    const newErrors = {};
    newErrors.username = !login.username;
    newErrors.password = !login.password;

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }


    Swal.fire({
      title: "Signing in...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(login),
      });

      const data = await res.json();

      Swal.close();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Username or password is incorrect",
        });
        return;
      }

      // success
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: "Login Successful",
        timer: 1200,
        showConfirmButton: false,
      });

      setUserData(data.user);

      navigate("/");

    } catch (err) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message || "An error occurred while trying to log in. Please try again later.",
      });
    }
  };

  const registerUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      Swal.fire({
        icon: "success",
        title: "Account Created",
      });

      setMode("login");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  const handleChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };
  
  // redirect to logged in user
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [navigate, setUserData]);

  useEffect(() => {
      const handleEnter = (e) => {
        if (e.key === "Enter") signIn();
      };
  
      document.addEventListener("keydown", handleEnter);
  
      return () => document.removeEventListener("keydown", handleEnter);
    }, [signIn]);
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-11/12 max-w-md bg-white px-8 py-10 rounded-lg shadow-lg">
        <div className="mt-5 flex justify-center">
          <FaUserCircle className="text-gray-500 text-6xl" />
        </div>
        
        {/* Login */}
        <>
          <p className="mb-28 mt-3 text-center font-primary text-2xl font-bold text-gray-600">
            {mode === "login" ? "Login" : "Create an Account"}
          </p>

          <div>
            <p className="font-primary text-xl font-bold">
              Username:
            </p>
            <textarea
              name='username'
              value={login.username}
              onChange={handleChange}
              placeholder="Username..."
              className="w-full border border-black rounded bg-transparent p-2 outline-none resize-none"
              rows={1}
            />
            {errors.username && (
              <p className="font-primary text-xs font-thin text-red-500">
                * This field is required
              </p>
            )}
          </div>

          <div>
            <p className="font-primary text-xl font-bold">
              Password:
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Password..."
                className="w-full border border-black rounded bg-transparent p-2 pr-10 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="font-primary text-xs font-thin text-red-500">
                * This field is required
              </p>
            )}
          </div>

          <div className="mt-6">
            <div
              onClick={() => {
                mode === "login" ? signIn() : registerUser();
              }}
            >
              <GeneralButton 
              text={mode === "login" ? "Login" : "Register"} 
              color={"blue"}
              />
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => setMode("register")}
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default LoginPage;
