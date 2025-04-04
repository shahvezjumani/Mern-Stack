import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 shadow-lg text-white h-[100px]">
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>

          {/* Navigation items */}
          <ul className="flex space-x-6">
            {navItems.map(({ name, slug, active }) =>
              active ? (
                <li key={slug}>
                  <NavLink
                    to={slug}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-500 font-semibold underline decoration-4 transition-all duration-300 ease-in-out"
                        : "text-gray-300 hover:text-red-500 hover:scale-105 transition-transform duration-300"
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>

          {/* Logout button */}
          {authStatus && (
            <div>
              <LogoutBtn />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
