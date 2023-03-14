import { Outlet } from "react-router"
import Navbar from "./components/global/Navbar"
import { motion } from "framer-motion"
export default function Layout() {
  return (
    <>
      <Navbar />
      <motion.main initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ opacity: "0%" }} transition={{ duration: 0.25 }} className="overflow-x-hidden">
        <Outlet />
      </motion.main>
    </>
  )
}
