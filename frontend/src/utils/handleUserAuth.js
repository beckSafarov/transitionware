import axios from 'axios'

export default async () => {
  try {
    const res = await axios.get('/api/auth/me')
    return { success: true, data: res.data.data }
  } catch (error) {
    return { success: false, data: error }
  }
}