import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3501/login',
      data: {
        name: username,
        password
      }
    })
    console.log(result);
    console.log(result.status);
    if(result.status === 200){
      localStorage.setItem("websocketuser",JSON.stringify(result.data))
      setIsAuthenticated(true);
      navigate('/forum')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={e=> setUsername(e.target.value)} placeholder='Enter username' />
      <br/>
      <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder='Enter password' />
      <br />
      <button type="submit">Login</button>
      <br/>
      <Link to="/signup">Create User</Link>
    </form>
  )
}

export default Login
