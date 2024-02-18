const express = require('express')
const Router = express.Router()
const router = Router
const admin_user = require('./api/adminUserRouter')
const admin_book = require('./api/adminBookRouter')
const user = require('./api/UserRouter')
const apply = require('./api/ApplyRouter')
const notice = require('./api/NoticeRouter')
const upImg = require('./upImg')

const cors = require('cors');

router.use(cors())
router.use(admin_user)
router.use(admin_book)
router.use(user)
router.use(apply)
router.use(notice)
router.use(upImg)

module.exports = router
