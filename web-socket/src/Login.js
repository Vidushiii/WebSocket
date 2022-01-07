import React from 'react'

const Login = ({ setIsAuthenticated }) => (
  <form>
    <input type="text" placeholder='Enter username' />
    <br/>
    <input type="password" placeholder='Enter password' />
    <br />
    <button>Login</button>
  </form>

)

export default Login
