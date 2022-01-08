import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useState } from "react";
import Homepage from "./Forum/Homepage";
import ChannelPage from "./Forum/ChannelPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/forum"
          exact
          element={<Homepage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/forum/post"
          exact
          element={<ChannelPage setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
