"use client";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import menuData from "./menuData";

const Header = () => {
  const { data: session } = useSession();

  const pathUrl = usePathname();
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const { theme, setTheme } = useTheme();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`ud-header left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${sticky
          ? "shadow-[0_0_30px_rgba(124,58,237,0.35)] fixed z-[999] border-b border-[#7C3AED]/30 bg-[#07070B]/95 backdrop-blur-xl"
          : "absolute bg-transparent"
          }`}
      >
        {/* Animated background glow when sticky */}
        {sticky && (
          <>
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(600px 100px at 30% 50%, rgba(124,58,237,0.15), transparent 70%)",
                  "radial-gradient(600px 100px at 70% 50%, rgba(124,58,237,0.15), transparent 70%)",
                  "radial-gradient(600px 100px at 30% 50%, rgba(124,58,237,0.15), transparent 70%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(500px 80px at 70% 50%, rgba(34,211,238,0.12), transparent 70%)",
                  "radial-gradient(500px 80px at 30% 50%, rgba(34,211,238,0.12), transparent 70%)",
                  "radial-gradient(500px 80px at 70% 50%, rgba(34,211,238,0.12), transparent 70%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
        <div className="container relative z-10">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link
                href="/"
                className={`navbar-logo block w-full ${sticky ? "py-2" : "py-5"
                  } `}
              >
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="absolute inset-0 text-white/10 blur-[2px] select-none">
                    IMAD SELIM
                  </span>

                  <motion.span
                    className={[
                      "relative font-extrabold tracking-tight",
                      "bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent",
                      sticky || pathUrl !== "/" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
                    ].join(" ")}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    IMAD SELIM
                  </motion.span>

                  {/* Glow effect */}
                  <motion.span
                    className="absolute inset-0 blur-lg bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent opacity-40"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className={[
                      "font-extrabold tracking-tight",
                      sticky || pathUrl !== "/" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
                    ].join(" ")}>
                      IMAD SELIM
                    </span>
                  </motion.span>
                </motion.span>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-[#7C3AED] focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? "opacity-0 " : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded-xl border border-[#7C3AED]/30 bg-[#07070B]/98 backdrop-blur-xl px-6 py-4 duration-300 shadow-[0_0_30px_rgba(124,58,237,0.25)] lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                    }`}
                >
                  <ul className="block lg:ml-8 lg:flex lg:gap-x-8 xl:ml-14 xl:gap-x-12 font-bold">
                    {menuData.map((menuItem, index) =>
                      menuItem.path ? (
                        <li key={index} className="group relative">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              onClick={navbarToggleHandler}
                              scroll={false}
                              href={menuItem.path}
                              className={`ud-menu-scroll relative flex py-2 text-base text-white transition-all lg:inline-flex lg:px-0 lg:py-6 ${pathUrl === menuItem?.path
                                ? "text-[#7C3AED]"
                                : "hover:text-[#F43F5E]"
                                }`}
                            >
                              {menuItem.title}
                              {pathUrl === menuItem?.path && (
                                <motion.span
                                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E]"
                                  layoutId="activeTab"
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        </li>
                      ) : (
                        <li className="submenu-item group relative" key={index}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => handleSubmenu(index)}
                              className="ud-menu-scroll flex items-center justify-between py-2 text-base text-white transition-all hover:text-[#F43F5E] lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}

                              <span className="pl-1">
                                <svg
                                  className={`duration-300 lg:group-hover:rotate-180`}
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </button>
                          </motion.div>

                          <div
                            className={`submenu relative left-0 top-full w-[250px] rounded-xl border border-[#7C3AED]/30 bg-[#07070B]/98 backdrop-blur-xl p-4 transition-[top] duration-300 shadow-[0_0_30px_rgba(124,58,237,0.25)] group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "!-left-[25px]" : "hidden"
                              }`}
                          >
                            {menuItem?.submenu?.map((submenuItem: any, i) => (
                              <Link
                                href={submenuItem.path}
                                key={i}
                                className={`block rounded-lg px-4 py-[10px] text-sm transition-all ${pathUrl === submenuItem.path
                                  ? "text-[#7C3AED] bg-[#7C3AED]/15"
                                  : "text-white/70 hover:text-[#F43F5E] hover:bg-[#F43F5E]/10"
                                  }`}
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;