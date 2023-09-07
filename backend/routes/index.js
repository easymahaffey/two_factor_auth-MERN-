let express = '../../server/node_modules/express'
const router = require(express).Router()
const authRoutes = require("./authRoutes")
const appRoutes = require("./appRoutes")

router.use("/auth", authRoutes)
router.use("/contacts", appRoutes)

module.exports = router