const Loginform = ({ handleLogin,username,handleUsername,password,handlePassword }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
          username
      <input
        type="text"
        value={username}
        id="inUser"
        onChange={handleUsername}
      />
    </div>
    <div>
          password
      <input
        type="password"
        value={password}
        id="inPassword"
        onChange={handlePassword}
      />
    </div>
    <button id='btnSubmit' type="submit">login</button>
  </form>
)

export default Loginform