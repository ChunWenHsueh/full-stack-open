import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  console.log(object)
  const response = await axios.post(`${baseUrl}/anecdotes`, object)
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/anecdotes/${object.id}`, object)
  return response.data
}

export default { getAll, createNew, update }
