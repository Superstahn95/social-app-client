import Container from "./Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@headlessui/react";

function Navbar({ isSignIn = false }) {
  //   const [enabled, setEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);
  return (
    <nav className=" p-5 shadow-md bg-slate-200">
      <Container>
        <div className="font-montserrat flex items-center justify-between ">
          <Link to={"/home"} className="font-bold text-2xl">
            {" "}
            SocialApp
          </Link>
          <div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${darkMode ? "bg-black" : "bg-blue-500"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${darkMode ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0  transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
