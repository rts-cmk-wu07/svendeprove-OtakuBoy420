import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import LoginModalContext from "../../contexts/LoginModalContext";

import LoginForm from "../subcomponents/LoginForm";
import { X } from "lucide-react";
import AuthContext from "../../contexts/AuthContext";

export default function LoginModal() {
  const { loginModal, setLoginModal } = useContext(LoginModalContext);

  const { auth } = useContext(AuthContext);
  return (
    <AnimatePresence>
      {loginModal && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, type: "tween" }}
          className="absolute top-0 left-0 z-20 h-screen w-full overflow-hidden bg-welcome bg-cover bg-center">
          <button className="absolute top-4 right-4 z-50 cursor-pointer text-white" onClick={() => setLoginModal(false)}>
            <X size={42} />
          </button>
          <div className="absolute left-1/2 top-1/2 -z-10 h-[3000px] w-[500px] -translate-x-1/2 -translate-y-1/2 rotate-[55deg] bg-primary/50" />
          <div className="flex h-full flex-col justify-center p-8">
            <h1 className="text-shadow mb-4 text-2xl text-dimWhite">{auth ? "Log ud" : "Log ind"}</h1>
            <LoginForm />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
