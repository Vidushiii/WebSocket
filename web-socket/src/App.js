import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useState } from "react";

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
      </Routes>
    </Router>
  );
};

export default App;
