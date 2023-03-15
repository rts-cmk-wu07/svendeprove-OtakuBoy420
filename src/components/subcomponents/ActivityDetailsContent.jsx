import { fadeUp } from "../../utils/motion";
import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import LoginModalContext from "../../contexts/LoginModalContext";
export default function ActivityDetailsContent({ data }) {
  const { auth } = useContext(AuthContext);
  const { loginModal, setLoginModal } = useContext(LoginModalContext);
  return (
    <article className="flex flex-col p-4">
      <motion.h1 variants={fadeUp(0.1)} className="text-lg">
        {data?.name}
      </motion.h1>
      <motion.p variants={fadeUp(0.3)}>
        {data?.minAge}-{data?.maxAge} år
      </motion.p>
      <motion.p variants={fadeUp(0.5)} className="mb-4 capitalize">
        {data?.weekday}, {data?.time}
      </motion.p>

      <motion.p variants={fadeUp(0.7)} className="text-sm">
        {data?.description}
      </motion.p>
      {!auth && (
        <motion.div variants={fadeUp(1)} className="mt-6 flex flex-col gap-2">
          <motion.p className="text-sm">(Du skal være logget ind for at tilmelde dig)</motion.p>
          <button className="rounded-full border border-black bg-secondary/25 py-1.5 px-2" onClick={() => setLoginModal(true)}>
            Log ind her
          </button>
        </motion.div>
      )}
    </article>
  );
}
