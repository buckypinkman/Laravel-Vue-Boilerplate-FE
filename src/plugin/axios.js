import axios from 'axios'
import Router from "@/router"
import { useMessage } from 'naive-ui'
import { api_base_url } from '@/constants/config'

const BACKEND_API_URL = api_base_url

// console.log(BACKEND_API_URL)

axios.defaults.baseURL = BACKEND_API_URL
axios.defaults.headers.common['Lang'] = 'en'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response.status == 401 && !window.location.pathname.includes('login')) {
            localStorage.removeItem('token')

            Router.push('/login')
        }
        return Promise.reject(error)
    }
);


export default axios