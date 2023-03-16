import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
export default function Button({ children, animated, onClick, className, type }) {
  return animated ? (
    <motion.button
      initial="hidden"
      animate="show"
      variants={slideIn("right", "spring", 0.3, 1.5)}
      type={type}
      onClick={onClick}
      className={"w-[249px] rounded-[10px] border-none bg-primary py-3 shadow-primary outline-none ring-0 " + className}>
      {children}
    </motion.button>
  ) : (
    <button type={type} onClick={onClick} className={"w-[249px] rounded-[10px] border-none bg-primary py-3 shadow-primary outline-none ring-0 " + className}>
      {children}
    </button>
  );
}
