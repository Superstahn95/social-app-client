import Container from "./Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
import { data } from "autoprefixer";

function Navbar({ isSignIn = false }) {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "light" ? false : true);
  useEffect(() => {
    if (darkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [darkMode]);
  console.log(darkMode);
  return (
    <nav className=" p-5 shadow-md bg-slate-200 dark:bg-slate-900">
      <Container>
        <div className="font-montserrat flex items-center justify-between ">
          <Link to={"/"} className="font-bold text-2xl dark:text-white">
            {" "}
            SocialApp
          </Link>
          <div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${darkMode ? "bg-white" : "bg-slate-900"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  darkMode
                    ? "translate-x-9 bg-slate-900"
                    : "translate-x-0 bg-white"
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full  shadow-lg ring-0  transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
