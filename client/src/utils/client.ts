import axios from 'axios'
import { API_BASE_URL } from '../constants/env'

export const client = axios.create({
  baseURL: API_BASE_URL,
})
