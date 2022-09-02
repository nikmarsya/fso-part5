import propTypes from 'prop-types'
import { useState } from 'react'

const Entryform = ({ handleCreateBlog }) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const handleTitle = e => {
    setTitle(e.target.value)
  }

  const handleAuthor = e => {
    setAuthor(e.target.value)
  }

  const handleUrl = e => {
    setUrl(e.target.value)
  }

  const addBlog = e => {
    e.preventDefault()

    handleCreateBlog({
      'title':title,
      'author':author,
      'url':url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>title: <input className='title' value={title} onChange={handleTitle}  ></input></p>
        <p>author: <input className='author' value={author} onChange={handleAuthor} ></input></p>
        <p>url: <input className='url' value={url} onChange={handleUrl} ></input></p>
        <p><button id='btnSubmit' type='submit' >Submit</button></p>
      </form>
    </div>
  )}

Entryform.propTypes = {
  handleCreateBlog : propTypes.func.isRequired
}

export default Entryform