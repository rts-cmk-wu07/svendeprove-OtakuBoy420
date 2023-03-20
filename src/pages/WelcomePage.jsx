import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEO from "../components/global/SEO";
import Button from "../components/subcomponents/Button";
import { fadeIn } from "../utils/motion";
export default function WelcomePage({ setHasSeenWelcome }) {
  const navigate = useNavigate();
  function handleGetStarted() {
    sessionStorage.setItem("hasSeenWelcome", true);
    setHasSeenWelcome(true);
    navigate("/");
  }
  return (
    <AnimatePresence>
      <SEO title="Landrup Dans - Velkommen" />
      <motion.section
        key="welcomepage"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          },
          show: {
            opacity: 1,
            transition: {
              duration: 1,
            },
          },
        }}
        className="relative flex h-screen w-screen flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-white bg-welcome bg-cover bg-center text-white">
        <article className="flex w-fit flex-col self-start rounded-t-2xl backdrop-blur-sm sm:self-center">
          <h1 className="flex flex-col py-1 pl-6 pr-4">
            <motion.span
              variants={fadeIn("right", "spring", 0, 1.5)}
              className="welcome-text-stroke-purple font-roboto text-[44px] font-bold uppercase leading-none tracking-tighter text-transparent sm:text-7xl">
              Landrup
            </motion.span>
            <motion.span
              variants={fadeIn("right", "spring", 0.5, 1.5)}
              className="welcome-text-stroke-dark -mt-2 font-racing text-7xl font-bold uppercase leading-none tracking-tighter text-[#E856EB] sm:text-9xl">
              Dans
            </motion.span>
          </h1>
          <motion.div variants={fadeIn("right", "tween", 1, 0.75)} className="h-[14px] w-[249px] bg-[#913693] sm:h-6 sm:w-full" />
        </article>
        <motion.div variants={fadeIn("up", "spring", 1.5, 1.5)} className="absolute bottom-0 mb-14">
          <Button onClick={handleGetStarted}>Kom i gang</Button>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
