import { Calendar, Home, Search, User } from "lucide-react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import LoginModalContext from "../../contexts/LogInModalContext"

export default function Navbar() {
  const { loginModal, setLoginModal } = useContext(LoginModalContext)
  const navigationLinks = [
    { path: "/activities", icon: Home },
    { path: "/search", icon: Search },
    { path: "/calendar", icon: Calendar },
    {
      name: "login",
      icon: User,
      onClick: () => {
        setLoginModal(!loginModal)
      },
    },
  ]
  return (
    <nav className="fixed bottom-0 z-20 flex w-full select-none flex-row items-center justify-center bg-white">
      <ul className="mx-auto flex w-full justify-between px-8 text-black">
        {navigationLinks.map((link, index) => (
          <li key={index}>
            {link.name === "login" ? (
              <button onClick={link.onClick}>
                <link.icon size={26} className="my-3 box-content inline-block rounded-2xl border border-black object-center p-1" />
              </button>
            ) : (
              <NavLink to={link.path} onClick={() => setLoginModal(false)}>
                <link.icon size={26} className="my-3 box-content inline-block rounded-2xl border border-black object-center p-1" />
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
