const express = require('express')
const app = express()
const playerRoute = require('./players/route')
const config = require('./config.json')


const server = app.listen(config.port,()=>{
    console.log(`App is running on port ${config.port}`)
})


app.use('/',playerRoute)

module.exports = app