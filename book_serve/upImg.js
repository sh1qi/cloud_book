const express = require('express')
const Router = express.Router()

const multer = require('multer')
const fs = require("fs")

const router = Router

router.post("/img", multer({ dest: "img" }).single('file'), (req, res) => {
    let imgName = req.file.mimetype
    console.log(req.file);
    let index = imgName.lastIndexOf("/");
    imgName = imgName.substring(index + 1, imgName.length);
    let newFileName = Date.now().toString() + "." + imgName
    fs.renameSync(req.file.path, `${req.file.destination}\\${newFileName}`)
    res.status(200).json({
        fileName: newFileName
    })
})

module.exports = router
