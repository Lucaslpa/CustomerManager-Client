import axios from 'axios'

export const Api = axios.create({
  baseURL: `http://localhost:2000`,
  responseType: 'json',
  validateStatus: () => true, // I'm always returning true, you may want to do it depending on the status received
})
