import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import LoginModalContext from "../../contexts/LoginModalContext";
import useLogin from "../../hooks/useLogin";
import Button from "../subcomponents/Button";
import Loader from "../global/Loader";
import { setCookie } from "react-use-cookie";
import { AnimatePresence, motion } from "framer-motion";
import * as Yup from "yup";
import { X } from "lucide-react";

const schema = Yup.object().shape({
  username: Yup.string().required("Du skal skrive et brugernavn og adgangskode"),
  password: Yup.string().required("Du skal skrive et brugernavn og adgangskode"),
});
export default function LoginForm() {
  const { handleLogin, isLoading, errorMessage } = useLogin();
  const { setLoginModal } = useContext(LoginModalContext);
  const { auth, setAuth } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onSubmit(data) {
    const { username, password, remember } = data;
    handleLogin(username, password, remember, setLoginModal);
  }
  function showToastError() {
    toast.error("Du skal skrive et brugernavn og adgangskode", {
      autoClose: 1500,
      position: "top-center",
      className: "toast-top-message",
    });
  }
  function logOut(e) {
    e.preventDefault();
    e.stopPropagation();
    setAuth(null);
    setCookie("token", "", { days: 0 });
    sessionStorage.removeItem("token");
    toast.success("Du har logget ud", {
      autoClose: 1500,
      position: "top-center",
      className: "toast-top-message",
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, showToastError)} className="flex flex-col space-y-8 text-base leading-6 text-gray-700 lg:relative lg:rounded-xl lg:bg-black lg:px-4 lg:py-8">
      <h1 className="text-shadow mb-4 text-2xl text-dimWhite">{auth ? "Log ud" : "Log ind"}</h1>
      <div className="absolute -top-4 right-4 z-50 hidden cursor-pointer text-white lg:block" onClick={() => setLoginModal(false)}>
        <X size={42} />
      </div>
      {!auth && (
        <>
          <div className="relative">
            <input
              autoComplete="off"
              id="username"
              {...register("username")}
              type="text"
              placeholder="Brugernavn"
              className="peer w-full rounded-full bg-dimWhite py-2 pl-4 text-black placeholder-transparent shadow-lg focus:outline-none"
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
              {...register("password")}
              type="password"
              placeholder="password"
              className="peer w-full rounded-full bg-dimWhite py-2 pl-4 text-black placeholder-transparent shadow-lg focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-6 z-10 cursor-text text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999] peer-focus:-top-6 peer-focus:text-white">
              Adgangskode
            </label>
          </div>
          <label className="mx-auto flex select-none items-center justify-center text-white" htmlFor="remember">
            <input className="mr-2 h-5 w-5" type="checkbox" {...register("remember")} id="remember" name="remember" />
            <span className="text-shadow text-lg">Husk mig</span>
          </label>
        </>
      )}
      <div className="relative flex w-full items-end">
        {auth ? (
          <Button
            className="mx-auto
          
          text-white"
            onClick={logOut}>
            Log ud
          </Button>
        ) : (
          <Button type="submit" className="mx-auto text-white">
            {isLoading ? <Loader /> : "Log ind"}
          </Button>
        )}
        <AnimatePresence>
          {(errors.username?.message || errors.password?.message || errorMessage) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, type: "spring" }}
              className="absolute -bottom-16 w-full self-end rounded border border-red-500 bg-black/75 text-center text-[16px] text-red-500">
              {errors.username?.message || errors.password?.message || errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
