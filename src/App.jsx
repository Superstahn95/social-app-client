import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequireAuth from "./Route/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* protected route */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
