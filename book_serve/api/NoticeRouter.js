const express = require('express')
const sqlFn = require('../mysql')
const Router = express.Router()
const router = Router
router.use(express.json())

router.get('/getNotice', async (req, res) => {
    reqQuery = req.query
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM notice';
    let sql = `SELECT * FROM notice ORDER BY date DESC limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM notice WHERE title = ${parseInt(reqQuery.search)}`;
        sql = `SELECT * FROM notice WHERE title = ${parseInt(reqQuery.search)} ORDER BY date DESC limit ${first},8`;
    }

    if (reqQuery.all === "all") {
        sql = `SELECT * FROM notice`
    }

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getNotice-len-error', e);
                return
            }
        })
    }

    function getNotice() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getNotice-getNotice-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getNotice()

    res.send({
        total: total,
        data: data
    })

})

router.get('/getNoticeItem', async (req, res) => {
    let sql = 'SELECT * FROM notice WHERE id = ?';
    let arr = [req.query.id]

    sqlFn(sql, arr, data => {
        res.status(200).json({
            data: data[0]
        })
    })
})

router.post('/newnotice', async (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'INSERT INTO notice(id,title,container,date) VALUES(?,?,?,?)'
    const id = Date.now().toString()
    const arr = [id, reqBody.title, reqBody.container, new Date()]


    if (!reqBody.title || !reqBody.container) {
        res.send({
            error: 10002,
            msg: '标题与内容不得为空'
        })
        return
    }

    sqlFn(sql, arr, data => {
        try {
            res.send({
                mode: 'ok',
                msg: '已添加新的通知'
            })
        } catch (e) {
            console.log(e);
        }
    })


})

router.post('/updatanotice', (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'UPDATE notice SET title = ?,container = ? WHERE id = ?'
    const arr = [reqBody.title, reqBody.container, reqBody.id]
    try {
        sqlFn(sql, arr, data => {
            res.send({
                msg: '通知更新成功',
                mode: 'ok'
            })
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/delnotice', (req, res) => {
    const sql = 'DELETE FROM notice where id = ?';
    const arr = [req.body.id]
    sqlFn(sql, arr, data => {
        res.send({
            msg: '通知删除成功',
            mode: 'ok'
        })
    })
})

module.exports = router