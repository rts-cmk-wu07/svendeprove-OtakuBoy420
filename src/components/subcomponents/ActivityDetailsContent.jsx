import { fadeUp } from "../../utils/motion";
import { motion } from "framer-motion";
export default function ActivityDetailsContent({ data }) {
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
    </article>
  );
}
