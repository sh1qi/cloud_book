const express = require('express')
const sqlFn = require('../mysql')
const Router = express.Router()
const router = Router
router.use(express.json())
const { generateToken } = require('../core/uitl')

router.get('/getUser', async (req, res) => {
    reqQuery = req.query
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM user';
    let sql = `SELECT uid,name,phone,pic FROM user ORDER  BY uid limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM user WHERE uid = ${parseInt(reqQuery.search)}`;
        sql = `SELECT uid,name,phone,pic FROM user WHERE uid = ${parseInt(reqQuery.search)} ORDER  BY id limit ${first},8`;
    }

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getUser-len-error', e);
                return
            }
        })
    }

    function getUser() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getUser-getUser-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getUser()

    res.send({
        total: total,
        data: data
    })

})

router.post('/updatauser', (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'UPDATE user SET name = ?,pic = ?,phone = ? WHERE uid = ?'
    const arr = [reqBody.name, reqBody.pic, reqBody.phone, reqBody.uid]
    try {
        sqlFn(sql, arr, data => {
            res.send({
                msg: '用户更新成功',
                mode: 'ok'
            })
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/updatauserpass', (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'UPDATE user SET pass = ? WHERE uid = ?'
    const arr = [reqBody.pass, reqBody.uid]
    try {
        sqlFn(sql, arr, data => {
            res.send({
                msg: '密码修改成功',
                mode: 'ok'
            })
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/login', async (req, res) => {
    const sql = 'SELECT * FROM user WHERE uid = ?'
    const arr = [req.body.user]

    const user = req.body.user
    const pass = req.body.pass

    function getData() {
        return new Promise(function (resolve) {
            sqlFn(sql, arr, data => {
                resolve(data)
            })
        })
    }
    const isUser = await getData();
    if (isUser[0] === undefined) {
        res.status(200).json({
            error: '该用户不存在，请重试'
        })
        return
    }

    if (isUser[0] != user && isUser[0].pass != pass) {
        res.status(200).json({
            error: '账号或者密码错误'
        })
        return
    }

    const name = isUser[0].name;
    const pic = isUser[0].pic;
    const phone = isUser[0].phone;

    const token = generateToken(isUser.id, isUser.user)

    res.status(200).json({
        token: token,
        name: name,
        pic: pic,
        phone: phone
    })

})

router.post('/newuser', async (req, res) => {
    const reqBody = req.body
    const searchSql = `SELECT * FROM user WHERE uid = "${reqBody.uid}"`
    const sql = 'INSERT INTO user(uid,pass,phone,name) VALUES(?,?,?,?)'
    const arr = [reqBody.uid, reqBody.pass, reqBody.phone, "user"]

    function getData(sql, arr) {
        let arrSql = null
        if (arr) {
            arrSql = arr
        }
        return new Promise(function (resolve) {
            sqlFn(sql, arrSql, data => {
                resolve(data)
            })
        })
    }

    const searchUser = await getData(searchSql)

    console.log(searchUser);
    if (searchUser.length === 0) {
        sqlFn(sql, arr, data => {
            try {
                res.send({
                    mode: 'ok',
                    msg: '账户已成功注册，快去登录体验吧'
                })
            } catch (e) {
                console.log(e);
            }
        })
        return
    }

    res.send({
        error: '10006',
        msg: '账户已被别人注册'
    })



})

module.exports = router