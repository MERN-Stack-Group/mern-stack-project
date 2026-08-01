import { Link, NavLink } from "react-router-dom";
import {
  Search,
  UserCircle,
  LogOut,
} from "lucide-react";

import { useAuth } from "../hooks/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  const navLinks = [
    {
      label: "Search",
      to: "/search",
      icon: Search,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="h-16 bg-[#4A044E] w-full"></div>
    );
  }

  return (
    <>
      <nav className="bg-[#4A044E] px-4 md:px-6 py-3 md:py-4 shadow-md w-full sticky top-0 z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link to="/search">
            <span className="text-xl font-bold text-white tracking-widest">
              LOGO
            </span>
          </Link>


          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 pb-1 border-b-2 ${
                      isActive
                        ? "text-white border-white font-semibold"
                        : "text-purple-200 border-transparent hover:text-white"
                    }`
                  }
                >
                  <Icon size={18}/>
                  {link.label}
                </NavLink>
              );
            })}

          </div>


          <div className="flex items-center gap-3">

            <Link
              to="/profile"
              className="p-2 rounded-full text-purple-200 hover:bg-[#6B116E]"
            >
              <UserCircle size={24}/>
            </Link>


            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-purple-200 hover:bg-[#6B116E]"
            >
              <LogOut size={24}/>
            </button>

          </div>

        </div>

      </nav>


      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#4A044E] h-16 flex justify-around items-center">

        {navLinks.map((link,index)=>{

          const Icon = link.icon;

          return (
            <NavLink
              key={index}
              to={link.to}
              className="text-purple-200"
            >
              <Icon size={22}/>
            </NavLink>
          );

        })}

      </nav>
    </>
  );
}