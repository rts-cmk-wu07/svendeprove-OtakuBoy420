import { AnimatePresence, motion } from "framer-motion"
import { useContext, useState } from "react"
import LoginModalContext from "../../contexts/LogInModalContext"
import Button from "../subcomponents/Button"
import { toast } from "react-toastify"
import useLogin from "../../hooks/useLogin"
import Loader from "./Loader"
import { X } from "lucide-react"
import AuthContext from "../../contexts/AuthContext"
import reactUseCookie from "react-use-cookie"
export default function LoginModal() {
  const { loginModal, setLoginModal } = useContext(LoginModalContext)
  const { handleLogin, errorMessage, isLoading } = useLogin()
  const [validationError, setValidationError] = useState("")
  const [tokenCookie, setTokenCookie] = reactUseCookie("token", undefined)
  const { auth, setAuth } = useContext(AuthContext)
  function submitHandler(e) {
    e.preventDefault()
    if (auth)
      if (e.target.username.value.trim() === "" && e.target.password.value.trim() === "") {
        toast.error("Please enter a username and password", {
          autoClose: 3000,
          position: "top-center",
          className: "toast-top-message",
        })
        setValidationError("Please enter a username and password")
      } else if (e.target.username.value.trim() === "") {
        toast.error("Please enter a username", {
          autoClose: 3000,
          position: "top-center",
          className: "toast-top-message",
        })
        setValidationError("Please enter a username")
      } else if (e.target.password.value.trim() === "") {
        toast.error("Please enter a password", {
          autoClose: 3000,
          position: "top-center",
          className: "toast-top-message",
        })
        setValidationError("Please enter a password")
      } else {
        setValidationError("")
        handleLogin(e.target.username.value, e.target.password.value, e.target.remember.checked, setLoginModal)
      }
  }
  return (
    <AnimatePresence>
      {loginModal && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, type: "tween" }}
          className="absolute top-0 left-0 z-20 h-screen w-full overflow-hidden bg-welcome bg-cover bg-center">
          <X size={42} className="absolute top-4 right-4 z-[99999999] cursor-pointer text-white" onClick={() => setLoginModal(false)} />
          <div className="absolute left-1/2 top-1/2 -z-10 h-[3000px] w-[500px] -translate-x-1/2 -translate-y-1/2 rotate-[55deg] bg-primary/50" />
          <div className="flex h-full flex-col justify-center p-8">
            <h1 className="mb-4 text-2xl text-dimWhite">{auth ? "Log ud" : "Log ind"}</h1>
            <form onSubmit={submitHandler} className="flex flex-col space-y-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
              {!auth && (
                <>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="username"
                      name="username"
                      type="text"
                      className="peer w-full rounded-lg bg-dimWhite py-2 pl-4 text-black placeholder-transparent focus:outline-none"
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
                      className="peer w-full rounded-lg bg-dimWhite py-2 pl-4 text-black placeholder-transparent focus:outline-none"
                      placeholder="password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-4 -top-6 z-10 cursor-text text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999] peer-focus:-top-6 peer-focus:text-white">
                      Username
                    </label>
                  </div>
                  <label className="mx-auto block font-bold text-white" htmlFor="remember">
                    <input className="mr-2 h-4 w-4 leading-tight" type="checkbox" id="remember" name="remember" />
                    <span className="text-shadow">Husk mig</span>
                  </label>
                </>
              )}
              <div className="relative flex w-full items-end">
                {auth ? (
                  <Button
                    className="mx-auto w-fit text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setAuth(null)
                      setTokenCookie(null)
                    }}>
                    Log ud
                  </Button>
                ) : (
                  <Button type="submit" className="mx-auto w-fit text-white">
                    {isLoading ? <Loader /> : "Log ind"}
                  </Button>
                )}
                <AnimatePresence>
                  {validationError && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.25, type: "spring" }}
                      className="absolute -top-7 w-full self-end rounded border border-red-500 bg-black/75 text-center text-[16px] text-red-500">
                      {validationError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
