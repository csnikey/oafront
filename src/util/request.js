import axios from 'axios'

const url = process.env.NODE_ENV == 'production'
	? ''
	: '/api'

const config = {
  withCredentials: true,
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },  
}

const instance = axios.create(config)

const request = {

}

export default instance
