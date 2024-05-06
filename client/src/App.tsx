import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Protected,
  Important,
  Navigation,
  MobileNav,
  TaskForm,
  Login,
  Signup,
  MobileUserProfile,
} from "./components";

function App() {
  return (
    <div className="flex w-screen h-screen ">
      <div className="fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] z-[12]">
        <TaskForm cardTitle="" />
      </div>
      {/* nav area */}
      <div className="max-mobile:hidden w-[30%] h-[100%] pc:w-[20%] flex justify-center items-center">
        <div className="w-[80%] h-[90%]  bg-[#2e2e2e] rounded-md border border-[#ffffff3d]">
          <Navigation />
        </div>
      </div>
      {/* main content */}
      <div className="relative w-screen h-[100%] mobile:w-[70 %] pc:w-[80%] flex  items-center">
        {/* mobiel user profile */}
        <MobileUserProfile />
        {/* mobile nav */}
        <MobileNav />

        <div className=" w-[100%] h-[100%]  mobile:w-[98%] mobile:h-[90%] bg-[#2e2e2e] mobile:rounded-md mobile:border border-[#ffffff3d] overflow-scroll">
          <Routes>
            <Route path="/" element={<Protected component={<Home />} />} />
            <Route
              path="/important"
              element={<Protected component={<Important />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
