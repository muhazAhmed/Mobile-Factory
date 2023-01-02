const express = require('express')
const route = express.Router()
const user = require ("./controllers/userController")

route.get('/', (req,res) => {
    return res.json("Api is Working ...")
})

route.post("/api/register", user.register)
route.post("/api/login", user.loginUser)
route.patch("/api/user/update/:id", user.updateUser)
route.delete("/api/user/delete/:id", user.deleteUser)

module.exports = route