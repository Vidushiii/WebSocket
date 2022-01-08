import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Homepage from "./Forum/Homepage";
import ChannelPage from "./Forum/ChannelPage";
import CreateUser from "./CreateUser";
let socket = '';
const ENDPOINT = "http://localhost:3510";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem('websocketuser'));
    if(user){
      setUser(user);
      setIsAuthenticated(true);
    }
    if(isAuthenticated){
      socket = io(ENDPOINT);
    }
    setIsLoading(false);
  }, [isAuthenticated])

  // useEffect(()=> {
    
  //   console.log(socket);
  // },[isAuthenticated])
  return (
    <>
      {isLoading ?
        <div>Loading....</div>
        :
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            exact
            element={<CreateUser />}
          />
          <Route
            path="/forum"
            exact
            element={<Homepage isAuthenticated={isAuthenticated} user = {user}/>}
          />
          <Route
            path="/forum/:id"
            exact
            element={<ChannelPage user={user} socket={socket} />}
          />
        </Routes>
      </Router>
    }
    </>
  );
};

export default App;
