import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/subcomponents/Button";
import { fadeIn, fadeUp } from "../utils/motion";
import { useNavigate } from "react-router-dom";
export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <motion.section initial="hidden" animate="show" className="relative flex h-screen w-screen flex-col items-center justify-center bg-welcome bg-cover bg-center">
        <article className="rounded-x flex w-fit flex-col self-start rounded-2xl backdrop-blur-sm">
          {/* DESIGN ÆNDRING */}
          <h1 className="flex flex-col py-1 pl-6 pr-4">
            <motion.span
              variants={fadeIn("right", "spring", 0.1, 1.5)}
              className="welcome-text-stroke-dark font-roboto text-[44px] font-bold uppercase leading-none tracking-tighter text-transparent">
              Landrup
            </motion.span>
            <motion.span
              variants={fadeIn("right", "spring", 0.6, 1.5)}
              className="welcome-text-stroke-purple -mt-2 font-racing text-7xl font-bold uppercase leading-none tracking-tighter text-[#E856EB]">
              Dans
            </motion.span>
          </h1>
          <motion.div variants={fadeIn("right", "tween", 1.1, 0.75)} className="h-[14px] w-[249px] bg-[#913693]" />
        </article>

        <motion.div variants={fadeIn("up", "spring", 1.5, 1.5)} className="absolute bottom-0 mb-14">
          <Button
            onClick={() => {
              navigate("/activities");
            }}>
            Kom i gang
          </Button>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}

//text-stroke, font-bold, større text
