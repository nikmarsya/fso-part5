import axios from 'axios'
const baseUrl = 'http://localhost:3003/api'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const deleteBlog = async (id) => {
  const config ={ headers:{ Authorization:token } }

  const request = await axios.delete(baseUrl+'/blogs/'+id,config)
  return request.data
}

const updateBlog = async (id,updatedBlog) => {
  const config ={ headers:{ Authorization:token } }

  const request = await axios.put(baseUrl+'/blogs/'+id,updatedBlog,config)
  return request.data
}

const getAll = async() => {
  const config ={ headers:{ Authorization:token } }
  const result = await axios.get(baseUrl+'/blogs',config)
  return result.data
}

const login = async (credentials) => {

  const response = await axios.post(baseUrl+'/login',credentials)
  return response
}

const createBlog = async (newBlog) => {
  const config ={ headers:{ Authorization:token } }
  const request = await axios.post(baseUrl+'/blogs',newBlog,config)
  return request.data
}

export default { getAll,login,setToken,createBlog,deleteBlog ,updateBlog }