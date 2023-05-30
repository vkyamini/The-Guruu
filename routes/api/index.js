const router = require('express').Router()

const userRoutes = require('./user')
const offerRoutes = require ('./offer')


router.use('/users', userRoutes)
router.use('/offers',offerRoutes )


module.exports = router