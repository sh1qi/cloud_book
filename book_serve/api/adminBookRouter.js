const express = require('express')
const sqlFn = require('../mysql')
const Router = express.Router()
const router = Router
router.use(express.json())

router.get('/getBook', async (req, res) => {
    reqQuery = req.query
    console.log(reqQuery);
    const first = (Number.parseInt(reqQuery.page) - 1) * 8
    let lenSql = 'SELECT * FROM book';
    let sql = `SELECT * FROM book ORDER  BY id limit ${first},8`;

    if (reqQuery.search && reqQuery.search != '') {
        lenSql = `SELECT * FROM book WHERE name = "${reqQuery.search}"`;
        sql = `SELECT * FROM book WHERE name = "${reqQuery.search}" ORDER  BY id limit ${first},8`;
    }
    if (reqQuery.sort && reqQuery.sort != '') {
        lenSql = `SELECT * FROM book WHERE  sort = "${reqQuery.sort}"`;
        sql = `SELECT * FROM book WHERE  sort = "${reqQuery.sort}" ORDER  BY id limit ${first},8`;
        if (reqQuery.search && reqQuery.search != '') {
            lenSql = `SELECT * FROM book WHERE name = "${reqQuery.search}" and sort = "${reqQuery.sort}"`;
            sql = `SELECT * FROM book WHERE name = "${reqQuery.search}" and sort = "${reqQuery.sort}" ORDER  BY id limit ${first},8`;
        }
    }


    console.log(sql);

    function len() {
        return new Promise(function (resolve) {
            try {
                sqlFn(lenSql, null, data => {
                    return resolve(data.length)
                })
            } catch (e) {
                console.log('getbook-len-error', e);
                return
            }
        })
    }

    function getbook() {
        return new Promise(function (resolve) {
            try {
                sqlFn(sql, null, data => {
                    return resolve(data)
                })
            } catch (e) {
                console.log('getbook-getbook-error', e);
                return
            }
        })
    }

    const total = await len()
    const data = await getbook()

    res.send({
        total: total,
        data: data
    })

})

router.get('/getBookItem', async (req, res) => {
    let sql = 'SELECT * FROM book WHERE id = ?';
    let arr = [req.query.id]

    sqlFn(sql, arr, data => {
        res.status(200).json({
            data: data[0]
        })
    })
})

router.post('/newbook', async (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'INSERT INTO book(id,name,img,writer,sort,area) VALUES(?,?,?,?,?,?)'
    const id = Date.now().toString()
    const arr = [id, reqBody.name, reqBody.img || null, reqBody.writer || null, reqBody.sort, reqBody.area]


    if (!reqBody.name || !reqBody.sort) {
        res.send({
            error: 10002,
            msg: '书名与分类不能为空'
        })
        return
    }

    sqlFn(sql, arr, data => {
        try {
            res.send({
                mode: 'ok',
                msg: '已添加新的书籍'
            })
        } catch (e) {
            console.log(e);
        }
    })


})

router.post('/updatabook', (req, res) => {
    const reqBody = req.body
    console.log(reqBody);
    const sql = 'UPDATE book SET name = ?,img = ?,writer = ?, sort=?,area=?WHERE id = ?'
    const arr = [reqBody.name, reqBody.img, reqBody.writer, reqBody.sort, reqBody.area, reqBody.id]
    try {
        sqlFn(sql, arr, data => {
            res.send({
                msg: '书籍更新成功',
                mode: 'ok'
            })
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/delbook', (req, res) => {
    const sql = 'DELETE FROM book where id = ?';
    const arr = [req.body.id]
    sqlFn(sql, arr, data => {
        res.send({
            msg: '书籍下架成功',
            mode: 'ok'
        })
    })
})

router.get("/getHomeBook", (req, res) => {
    const data = [
        {
            id: "1651537057195",
            img: "banner1.jpg",
            title: "南派三叔全新力作"
        },
        {
            id: "1651537209622",
            img: "banner2.jpg",
            title: "法医秦明 || 皮囊之下 || 尽是枯骨"
        },
        {
            id: "1651537303077",
            img: "banner3.jpg",
            title: "李盾 -- 带你走进音乐剧世界"
        },
        {
            id: "1651537331217",
            img: "banner4.jpg",
            title: "这本书，不说收藏说人缘！"
        }
    ]
    res.status(200).json({
        data: data
    })
})

module.exports = router