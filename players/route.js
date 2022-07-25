const express = require('express')
const router = express.Router()
const playerController = require('./controller')

router.get('',playerController.getAllPlayers)

module.exports = router