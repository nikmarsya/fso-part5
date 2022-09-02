import { useState, useEffect,useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import Entryform from './components/Entryform'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [User,setUser] = useState(null)
  const [notification,setNotification] = useState({ type:0,message:'' })
  const blogFormRef = useRef()

  const loginform = () => {
    return(
      <div>
        <Togglable buttonlabel='Log in' >
          <Loginform
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  const entryform = () => {
    return(
      <div>
        <Togglable buttonlabel='Create New Entries' ref={blogFormRef}>
          <Entryform
            handleCreateBlog={handleCreateBlog}
          />
        </Togglable>
      </div>
    )
  }

  const handleCreateBlog = async (newData) => {
    try{
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createBlog(newData)

      const blogs = await blogService.getAll()
      setBlogs( blogs )
      blogs.sort((a,b) => b.likes-a.likes)
      setNotification({ type:0,message:`a new blog ${result.title} by ${result.author} is added` })
      setTimeout(() => {
        setNotification({ type:0,message:'' })
      },5000)
    }catch(err){

      setNotification({ type:0,message:err.message })
      setTimeout(() => {
        setNotification({ type:0,message:'' })
      },5000)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const response = await blogService.login({ username,password })
      window.localStorage.setItem('user',JSON.stringify(response.data))
      blogService.setToken(response.data.token)
      setUser(response.data)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs( blogs )
      blogs.sort((a,b) => b.likes-a.likes)
    }catch(err){
      setNotification({ type:1,message:err.message })
      setTimeout(() => {
        setNotification({ type:0,message:'' })
      },5000)
    }
  }

  const handleDelete = async (e,blog) => {
    try{
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.deleteBlog(blog.id)
        const blogs = await blogService.getAll()
        setBlogs( blogs )
        blogs.sort((a,b) => b.likes-a.likes)
      }
    }catch(err){
      setNotification({ type:1,message:err.response.data })
      setTimeout(() => {
        setNotification({ type:0,message:'' })
      },5000)
    }
  }

  const handleUpdate = async (id,updateData) => {

    try{
      await blogService.updateBlog(id,updateData)
      const blogs = await blogService.getAll()
      setBlogs( blogs )
      blogs.sort((a,b) => b.likes-a.likes)
    }catch(err){
      setNotification({ type:1,message:err.response.data })
      setTimeout(() => {
        setNotification({ type:0,message:'' })
      },5000)
    }
  }

  useEffect(() => {
    const loggeduser = window.localStorage.getItem('user')
    if(loggeduser){
      const user = JSON.parse(loggeduser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])



  return (
    <div>
      <Notification notice={ notification } />
      {User===null?loginform():
        <>
          <h2>blogs</h2>
          <p>{ User.name } logged in <button onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }}>log out</button></p>
          {entryform()}
          {blogs.map( blog =>
            <Blog  key={blog.id} blog={blog} user={User.username} handleDelete={handleDelete} handleUpdate={handleUpdate} />
          )}
        </>}
    </div>
  )
}

export default App
