const { Router } = require('express')
const router = Router()
const { createUser, getalluser, userLogin} = require("../controller/userController")
const { createProduct, getallproduct, updateproduct, deleteProduct } =require("../controller/productController")
const {Authentication,authorisation}=require("../Mw/auth")

router.post("/user", createUser)
router.get("/", getalluser)
router.post("/login", userLogin)
// router.put("/:Id",updateuser)
//-----------------product-------------
router.post("/createprod", Authentication, createProduct)
router.get("/product", Authentication, getallproduct)
router.put("/update/:Id", Authentication, authorisation, updateproduct)
router.delete("/delete/:Id", Authentication, authorisation, deleteProduct)




module.exports = router;