import { Link, NavLink, useLocation, useSearchParams } from "react-router";
import UserIcon from "../assets/icons/user.svg?react";
import Login from "./Login";
import Register from "./Register";
import { handleAuthError } from "~/utils/handleAuthError";

import { auth } from "~/lib/firebase";
import { signOut, type User } from "firebase/auth";
import { useAuth } from "~/context/AuthContext";

const HeaderThemes = {
  home: {
    header:
      "max-w-344 w-full h-22 border-b border-b-white-40 pl-23.75 pr-22.75 text-white absolute top-8 left-[50%] transform translate-x-[-50%] z-10 flex row items-center",
    nav: "flex row gap-10 ml-[40%] mr-[9%]",
  },
  nannies: {
    header:
      "max-w-385 w-full h-22 px-32 bg-red grid grid-cols-3 items-center text-white",
    nav: "flex row gap-10 mx-auto",
  },
};

export default function Header() {
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const isLoginOpen = searchParams.get("auth") === "login";
  const isRegisterOpen = searchParams.get("auth") === "register";
  const closeModal = () => {
    setSearchParams();
  };

  const location = useLocation();
  const style = location.pathname === "/" ? "home" : "nannies";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "relative after:content-['•'] after:absolute after:top-4 after:left-1/2 after:transform after:translate-x-[-50%]"
      : "";
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      handleAuthError(error);
    }
  };

  return (
    <header className={HeaderThemes[style].header}>
      <Link to={"/"} className="text-2xl font-normal tracking-tight">
        Nanny.Services
      </Link>
      <nav className={HeaderThemes[style].nav}>
        <NavLink to={"/"} className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to={"/nannies"} className={getNavLinkClass}>
          Nannies
        </NavLink>
        {user && location.pathname !== "/" && (
          <NavLink to={"/favorites"} className={getNavLinkClass}>
            Favorites
          </NavLink>
        )}
      </nav>
      {user ? (
        <div className="flex row gap-6 ml-auto">
          <div className="flex row gap-3.5 items-center">
            <div className="h-10 w-10 rounded-[10px] bg-white flex justify-center items-center">
              <UserIcon />
            </div>
            <h6 className="truncate max-w-20">{user.displayName}</h6>
          </div>
          <button
            className="w-33.5 h-12 border border-white-40 rounded-full cursor-pointer"
            onClick={() => handleLogOut()}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex row gap-2 ml-auto">
          <button
            className="w-31 h-12 rounded-full border border-white-40 cursor-pointer outline-none"
            onClick={() => {
              setSearchParams("?auth=login");
            }}
          >
            Log In
          </button>
          <button
            className="w-42 h-12 bg-red rounded-full cursor-pointer outline-none"
            onClick={() => {
              setSearchParams("?auth=register");
            }}
          >
            Registration
          </button>
        </div>
      )}
      {isLoginOpen && <Login onClose={closeModal} />}
      {isRegisterOpen && <Register onClose={closeModal} />}
    </header>
  );
}
