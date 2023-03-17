import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Home, Search, User } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginModalContext from "../../contexts/LoginModalContext";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { loginModal, setLoginModal } = useContext(LoginModalContext);
  const location = useLocation();
  const navigationLinks = [
    { path: "/", icon: Home },
    { path: "/search", icon: Search },
    { path: "/calendar", icon: Calendar },
    {
      name: "login",
      icon: User,
      onClick: () => {
        setLoginModal(!loginModal);
      },
    },
  ];
  return (
    <nav className="fixed bottom-0 z-20 flex w-full select-none flex-row items-center justify-center bg-white">
      <ul className="mx-auto flex w-full items-center justify-between px-8 text-black">
        {navigationLinks.map((link, index) => (
          <li className="relative" key={index}>
            <AnimatePresence>
              {location.pathname === link.path ? (
                <motion.div
                  layoutId="bottom-nav-active"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    scaleX: [1, 1.5, 1],
                  }}>
                  <div className="absolute left-0 my-2.5 h-[41.5px] w-[41.5px] cursor-pointer rounded-full bg-primary" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            {link.name === "login" ? (
              <button
                onClick={link.onClick}
                className={
                  loginModal
                    ? "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-primary p-1.5 text-primary"
                    : "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-black p-1.5"
                }>
                <link.icon className="z-10" size={24} />
              </button>
            ) : (
              <NavLink
                draggable={false}
                className={({ isActive }) =>
                  isActive
                    ? "my-2.5 flex items-center justify-center rounded-full border-2 border-black p-1.5 text-white"
                    : "my-2.5 flex items-center justify-center rounded-full border-2 border-black p-1.5"
                }
                to={link.path}
                onClick={() => setLoginModal(false)}>
                <link.icon className="z-10" size={24} />
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
