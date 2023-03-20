import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Home, Search, User } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginModalContext from "../../contexts/LoginModalContext";
import { useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Navbar() {
  const { loginModal, setLoginModal } = useContext(LoginModalContext);
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const navigationLinks = [
    { path: "/", icon: Home, name: "hjem" },
    { path: "/search", icon: Search, name: "søg" },
    { path: "/calendar", icon: Calendar, name: "kalender" },
    {
      name: "log ind",
      icon: User,
      onClick: () => {
        setLoginModal(!loginModal);
      },
    },
  ];
  return (
    <nav className="fixed bottom-0 z-20 flex w-full select-none flex-row items-center justify-center bg-white lg:relative">
      <ul className="mx-auto flex w-full items-center justify-between px-8 text-black lg:justify-center lg:gap-44 lg:px-32">
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
                  <div className="absolute left-0 my-2.5 h-[41.5px] w-[41.5px] cursor-pointer rounded-full bg-primary lg:hidden" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            {link.name === "log ind" ? (
              <button
                onClick={link.onClick}
                className={
                  loginModal
                    ? "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-primary p-1.5 text-primary lg:rounded-none lg:border-none lg:p-0"
                    : "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-black p-1.5 lg:rounded-none lg:border-none lg:p-0"
                }>
                <link.icon className="z-10 lg:mr-2" size={24} />
                <p className="hidden capitalize lg:block">{!auth ? link.name : "Log ud"}</p>
              </button>
            ) : (
              <NavLink
                draggable={false}
                className={({ isActive }) =>
                  isActive
                    ? "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-black p-1.5 text-white lg:rounded-none lg:border-none lg:p-0 lg:text-black lg:underline lg:underline-offset-4"
                    : "my-2.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-black p-1.5 lg:rounded-none lg:border-none lg:p-0"
                }
                to={link.path}
                onClick={() => setLoginModal(false)}>
                <link.icon className="z-10 lg:mr-2" size={24} />
                <p className="hidden capitalize lg:block">{link.name}</p>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
