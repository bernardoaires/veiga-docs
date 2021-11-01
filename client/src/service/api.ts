import axios from 'axios'

const API_URL = process.env.REACT_APP_ENDPOINT

interface ResponseReturn {
  ok: boolean,
  data?: any,
  error?: Error
}

export const getDocumentsByUserId = async (data: { userId: string }): Promise<ResponseReturn> => {
  try {
    const response = await axios.post(`${API_URL}/documents`, data)
    return {
      ok: true,
      data: response.data
    }
  } catch (err) {
    return {
      ok: false,
      error: err as Error
    }
  }
  

}