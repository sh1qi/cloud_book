const express = require('express')
const sqlFn = require('../mysql')
const Router = express.Router()
const router = Router
router.use(express.json())

router.get('/getApply', async (req, res) => {
    reqQuery = req.query
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM apply';
    let sql = `SELECT * FROM apply ORDER  BY id limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM apply WHERE uid = "${reqQuery.search}"`;
        sql = `SELECT * FROM apply WHERE uid = "${reqQuery.search}" ORDER  BY id limit ${first},8`;
    }

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getApply-len-error', e);
                return
            }
        })
    }

    function getApply() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getApply-getApply-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getApply()

    res.send({
        total: total,
        data: data
    })

})

router.get('/backtrac', async (req, res) => {
    reqQuery = req.query
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM apply WHERE stateType = 2';
    let sql = `SELECT * FROM apply WHERE stateType = 2 ORDER  BY id limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM apply WHERE stateType = 2, uid = "${reqQuery.search}"`;
        sql = `SELECT * FROM apply WHERE stateType = 2, uid = "${reqQuery.search}" ORDER  BY id limit ${first},8`;
    }

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getApply-len-error', e);
                return
            }
        })
    }

    function getApply() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getApply-getApply-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getApply()

    res.send({
        total: total,
        data: data
    })

})

router.get('/borrow', async (req, res) => {
    reqQuery = req.query
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM apply WHERE stateType = 1';
    let sql = `SELECT * FROM apply WHERE stateType = 1 ORDER  BY id limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM apply WHERE uid = "${reqQuery.search}",stateType = 1`;
        sql = `SELECT * FROM apply WHERE uid = "${reqQuery.search}",stateType = 1 ORDER  BY id limit ${first},8`;
    }

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getApply-len-error', e);
                return
            }
        })
    }

    function getApply() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getApply-getApply-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getApply()

    res.send({
        total: total,
        data: data
    })

})

router.post('/updataapply', (req, res) => {
    const reqBody = req.body
    const sql = 'UPDATE apply SET state = ?,stateType = ? WHERE id = ?'
    const arr = [reqBody.state, reqBody.stateType, reqBody.id]
    try {
        sqlFn(sql, arr, data => {
            res.send({
                msg: '数据更新成功',
                mode: 'ok'
            })
        })
    } catch (e) {
        console.log(e);
    }
})

router.get("/getUserApply", async (req, res) => {
    const reqQuery = req.query
    let sql = `SELECT * FROM apply WHERE uid = "${reqQuery.uid}"`

    function getLen(sql, arr) {
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

    const data = await getLen(sql)

    res.status(200).json({
        data: data,
        total: data.length
    })
})

router.post('/newbacktrac', (req, res) => {
    const sql = `UPDATE apply SET state = "申请还书",stateType = 2 WHERE id = ${req.body.id}`
    sqlFn(sql, null, data => {
        res.status(200).json({
            mode: 'ok',
            msg: "已发起申请"
        })
    })
})

router.post('/newborrow', (req, res) => {
    console.log(req.body);
    const sql = 'INSERT INTO apply(id,uid,user,bid,book,date,state,stateType) VALUES(?,?,?,?,?,?,?,?)'
    const arr = [Date.now().toString(), req.body.uid, req.body.user, req.body.bid, req.body.book, new Date(), "申请借阅", "1"]
    sqlFn(sql, arr, data => {
        res.status(200).json({
            mode: 'ok',
            msg: "已发起申请"
        })
    })
})

module.exports = router