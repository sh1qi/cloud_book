const express = require('express')
const router = require('./router')


const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.static('./img'))


app.use(router)


app.listen(5000, () => {
    5000
})