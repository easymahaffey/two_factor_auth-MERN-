let express = '../../server/node_modules/express'
const router = require(express).Router()
const controller = require("../controllers")

router.route("/").post(controller.getContacts)
router.route("/add").post(controller.addContact)
router.route("/delete").post(controller.deleteContact)
router.route("/update").post(controller.updateContact)
router.route("/deleteuser").post(controller.deleteUser)


module.exports = router