import { Outlet } from "react-router"
import Navbar from "./components/global/Navbar"
import { motion } from "framer-motion"
export default function Layout() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-y-auto overflow-x-hidden bg-primary text-white">
      <Navbar />
      <motion.main initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ opacity: "0%" }} transition={{ duration: 0.25 }} className="overflow-x-hidden pb-20">
        <Outlet />
      </motion.main>
    </div>
  )
}
