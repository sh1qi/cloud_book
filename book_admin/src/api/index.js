import axios from "axios";
import base from './base'
const BaseUrl = 'http://localhost:5000'
axios.defaults.baseURL = BaseUrl



const api = {
    login(json) {
        return axios.post(base.login, json)
    },
    verifyToken(token) {
        return axios({
            url: base.verifyToken,
            method: 'post',
            headers: { 'Authorization': token }
        })
    },
    getBook(params) {
        return axios.get(base.getBook, { params })
    },
    getUser(params) {
        return axios.get(base.getUser, { params })
    },
    getApply(params) {
        return axios.get(base.getApply, { params })
    },
    getNotice(params) {
        return axios.get(base.getNotice, { params })
    },
    getBacktrac(params) {
        return axios.get(base.backtrac, { params })
    },
    getBorrow(params) {
        return axios.get(base.borrow, { params })
    },
    newnotice(json) {
        return axios.post(base.newnotice, json)
    },
    newBook(json) {
        return axios.post(base.newbook, json)
    },
    updataBook(json) {
        return axios.post(base.updatabook, json)
    },
    updataApply(json) {
        return axios.post(base.updataapply, json)
    },
    updataNotice(json) {
        return axios.post(base.updatanotice, json)
    },
    updataUser(json) {
        return axios.post(base.updatauser, json)
    },
    delBook(json) {
        return axios.post(base.delbook, json)
    },
    delNotice(json) {
        return axios.post(base.delnotice, json)
    },
    updataUserPass(json) {
        return axios.post(base.updatauserpass, json)
    },
    getHome() {
        return axios.get(base.gethome)
    },
}

export default api