import Button from "../subcomponents/Button";
import { toast } from "react-toastify";
import Loader from "../global/Loader";
import { setCookie } from "react-use-cookie";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import LoginModalContext from "../../contexts/LogInModalContext";
import useLogin from "../../hooks/useLogin";
import { AnimatePresence, motion } from "framer-motion";
export default function LoginForm() {
  const { handleLogin, isLoading, errorMessage } = useLogin();
  const [validationError, setValidationError] = useState("");
  const { setLoginModal } = useContext(LoginModalContext);
  const { auth, setAuth } = useContext(AuthContext);
  function submitHandler(e) {
    e.preventDefault();
    if (e.target.username.value.trim() === "" && e.target.password.value.trim() === "") {
      toast.error("Please enter a username and password", {
        autoClose: 3000,
        position: "top-center",
        className: "toast-top-message",
      });
      setValidationError("Please enter a username and password");
    } else if (e.target.username.value.trim() === "") {
      toast.error("Please enter a username", {
        autoClose: 3000,
        position: "top-center",
        className: "toast-top-message",
      });
      setValidationError("Please enter a username");
    } else if (e.target.password.value.trim() === "") {
      toast.error("Please enter a password", {
        autoClose: 3000,
        position: "top-center",
        className: "toast-top-message",
      });
      setValidationError("Please enter a password");
    } else {
      setValidationError("");
      handleLogin(e.target.username.value, e.target.password.value, e.target.remember.checked, setLoginModal);
    }
  }
  function logOut(e) {
    e.preventDefault();
    e.stopPropagation();
    setAuth(null);
    setCookie("token", "", { days: 0 });
    toast.success("Logged out successfully", {
      autoClose: 1500,
      position: "top-center",
      className: "toast-top-message",
    });
  }
  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
      {!auth && (
        <>
          <div className="relative">
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              className="peer w-full rounded-lg bg-dimWhite py-2 pl-4 text-black placeholder-transparent shadow-lg focus:outline-none"
              placeholder="Brugernavn"
            />

            <label
              htmlFor="username"
              className="absolute left-4 -top-6 z-10 cursor-text text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999] peer-focus:-top-6 peer-focus:text-white">
              Brugernavn
            </label>
          </div>

          <div className="relative">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              className="peer w-full rounded-lg bg-dimWhite py-2 pl-4 text-black placeholder-transparent shadow-lg focus:outline-none"
              placeholder="password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-6 z-10 cursor-text text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999] peer-focus:-top-6 peer-focus:text-white">
              Username
            </label>
          </div>
          <label className="mx-auto flex items-center justify-center text-white" htmlFor="remember">
            <input className="mr-2 h-5 w-5" type="checkbox" id="remember" name="remember" />
            <span className="text-shadow  text-lg">Husk mig</span>
          </label>
        </>
      )}
      <div className="relative flex w-full items-end">
        {auth ? (
          <Button className="mx-auto text-white" onClick={logOut}>
            Log ud
          </Button>
        ) : (
          <Button type="submit" className="mx-auto text-white">
            {isLoading ? <Loader /> : "Log ind"}
          </Button>
        )}
        <AnimatePresence>
          {validationError ||
            (errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, type: "spring" }}
                className="absolute -bottom-14 w-full self-end rounded border border-red-500 bg-black/75 text-center text-[16px] text-red-500">
                {validationError ? validationError : errorMessage}
              </motion.p>
            ))}
        </AnimatePresence>
      </div>
    </form>
  );
}
