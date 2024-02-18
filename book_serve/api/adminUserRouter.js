const express = require('express')
const sqlFn = require('../mysql')
const Router = express.Router()
const router = Router
const { generateToken } = require('../core/uitl')
const Auth = require('../middewares/auth')
router.use(express.json())

router.post('/adminLogin', async (req, res) => {
    console.log(req.body);
    const sql = 'SELECT * FROM admin_user WHERE user = ?'
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

    const token = generateToken(isUser.id, isUser.user)

    res.status(200).json({
        token: token,
        name: name
    })

})

router.post('/verifyToken', new Auth().middleware, async (req, res) => {
})

router.get("/adminhome", async (req, res) => {
    const borrowSql = 'SELECT * FROM apply WHERE stateType = 1'
    const backtrackSql = 'SELECT * FROM apply WHERE stateType = 2'
    const aqqlyeSql = 'SELECT * FROM apply'
    const sortSql = "SELECT * FROM book WHERE sort = ?"

    function getLen(sql, arr) {
        let arrSql = null
        if (arr) {
            arrSql = arr
        }
        return new Promise(function (resolve) {
            sqlFn(sql, arrSql, data => {
                resolve(data.length)
            })
        })
    }

    const borrowLen = await getLen(borrowSql)
    const backtrackLen = await getLen(backtrackSql)
    const aqqlyeLen = await getLen(aqqlyeSql)

    let sortLen = [
        {
            value: "history",
            label: "历史",
        },
        {
            value: "literature",
            label: "文学",
        },
        {
            value: "Technology",
            label: "科技",
        },
        {
            value: "novel",
            label: "小说",
        },
        {
            value: "Science",
            label: "科学",
        },
        {
            value: "political",
            label: "政治",
        },
    ]

    for (const item of sortLen) {
        item.len = await getLen(sortSql, item.value)
    }


    console.log(borrowLen, backtrackLen, aqqlyeLen);

    res.status(200).json({
        sortLen: sortLen,
        borrowLen: borrowLen,
        backtrackLen: backtrackLen,
        aqqlyeLen: aqqlyeLen,
    })
})

module.exports = router