import { useState } from 'react'

const Blog = ({ blog,user,handleUpdate,handleDelete }) => {
  const [view,setView] = useState(false)
  const [label,setLabel] = useState('view')


  const showWhenVisible = { display: view?'':'none' }

  const changeView = () => {
    view?setLabel('view'):setLabel('hide')
    setView(!view)}

  const updateLikes = (e,blog) => {
    handleUpdate(blog.id,{
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user:blog.user
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='blog' style={blogStyle} >
      <div className='blog-details'>
        {blog.title} {blog.author} <button className='viewButton' onClick={changeView} >{label}</button>
      </div>
      <div className='toggleablecontent' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes <span id='likes'>{blog.likes}</span><button id='btnLikes' onClick={e => {updateLikes(e,blog)}}>like</button></p>
        <p id='name' >{blog.user.name}</p>
        <p>{blog.user.username===user?<button id='btnRemove' onClick={e => {handleDelete(e,blog)}}>remove</button>:''}</p>
      </div>

    </div>
  )
}

export default Blog