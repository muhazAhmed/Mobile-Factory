const express = require('express')
const route = express.Router()
const user = require ("./controllers/userController")
const mobile = require ("./controllers/mobileController")

route.get('/', (req,res) => {
    return res.json("Api is Working ...")
})

route.post("/api/register", user.register)
route.post("/api/login", user.loginUser)
route.post("/api/logout", user.logout)
route.patch("/api/user/update/:id", user.updateUser)
route.delete("/api/user/delete/:id", user.deleteUser)


route.post("/api/user/addmobile", mobile.addMobile)
route.get("/api/mobile", mobile.getMobile)
route.patch("/api/user/updatemobile/:id", mobile.updateMobile)
route.delete("/api/user/deletemobile/:id", mobile.deleteMobile)

route.all('/*', (req,res) => {
    return res.status(500).json("Endpoint is wrong")
})

module.exports = route