import axios from "axios";
import base from "./base";
const BaseUrl = 'http://localhost:5000'
axios.defaults.baseURL = BaseUrl

const api = {
    getNotice(params) {
        return axios.get(base.getNotice, { params })
    },
    getBook(params) {
        return axios.get(base.getBook, { params })
    },
    getBookItem(params) {
        return axios.get(base.getBookItem, { params })
    },
    getNoticeItem(params) {
        return axios.get(base.getNoticeItem, { params })
    },
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
    updataUser(json) {
        return axios.post(base.updatauser, json)
    },
    updataUserPass(json) {
        return axios.post(base.updatauserpass, json)
    },
    getUserApply(params) {
        return axios.get(base.getUserApply, { params })
    },
    newBorrow(json) {
        return axios.post(base.newborrow, json)
    },
    newBacktrac(json) {
        return axios.post(base.newbacktrac, json)
    },
    newUser(json) {
        return axios.post(base.newUser, json)
    },
    getHomeBook() {
        return axios.get(base.getHomeBook)
    },
}


export default api