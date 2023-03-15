import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { slideIn } from "../../utils/motion";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

export default function CalendarActivity({ activity, index }) {
  const { auth } = useContext(AuthContext);

  return (
    <AnimatePresence>
      <motion.article variants={slideIn("right", "spring", 0.1 * index, 0.75)} className="w-full rounded-[11px] bg-dimWhite text-black">
        <Link
          className="flex w-full flex-col rounded-[11px] p-4"
          to={auth.role === "default" ? `/activity/${activity?.id}` : auth.role === "instructor" ? `/roster/${activity?.id}` : "/activities"}>
          <h2 className="truncate text-lg">{activity?.name}</h2>
          {/* DESIGN ÆNDRING */}
          <p className="text-sm capitalize">
            {activity?.weekday} {activity?.time}{" "}
          </p>
        </Link>
      </motion.article>
    </AnimatePresence>
  );
}
