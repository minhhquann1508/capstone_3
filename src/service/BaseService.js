import axios from "axios"
import { ACCESS_TOKEN, DOMAIN, TOKEN } from "../util/constant"
export default class BaseService {
    constructor() { }
    get = (url) => {
        return axios({
            method: 'GET',
            url: `${DOMAIN}/${url}`,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN))}`
            }
        })
    }
    post = (url, model) => {
        return axios({
            method: 'POST',
            url: `${DOMAIN}/${url}`,
            data: model,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN))}`
            }
        })
    }
    put = (url, model) => {
        return axios({
            method: 'PUT',
            url: `${DOMAIN}/${url}`,
            data: model,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN))}`
            }
        })
    }
    delete = (url) => {
        return axios({
            method: 'DELETE',
            url: `${DOMAIN}/${url}`,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN))}`
            }
        })
    }
}