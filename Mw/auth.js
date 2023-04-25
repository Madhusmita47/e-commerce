const jwt = require("jsonwebtoken")
const productModel=require("../models/productModel")
//=========================== Authentication ==========================================

const Authentication=function (req,res,next){
    try {
    let token=req.headers["x-api-key"]
    if(!token) {return res.status(400).send({status:false,message:"token must be present"})}
     let decode =jwt.verify(token,"madhu")  
        if (!decode) { return res.status(401).send({ status: false, message: "user not authenticated" }) }
        req.userId=decode.userId
 next()
    }
    catch (error) {
        res.status(500).send({status: false, msg: error.message })
    }
 }
const authorisation = async function(req,res,next){
    try{
        let productId = req.params.Id  
    

        let token = req.headers["x-api-key"] 
        let decoded = jwt.verify(token, 'madhu')     
    
        if (!decoded) {
            return res.status(400).send({ status: false, msg: "token is not valid" })
        }
        
        let userLoggedIn = decoded.userId
 
        let productDetails =  await productModel.findOne({_id:productId})
     
        if (productDetails.userId.toString()!= userLoggedIn)
            return res.status(401).send({ status: false, msg: 'user logged is not allowed to modify the product data' })
            else {
            
                next()
            }
    }
    catch (error) {
        res.status(500).send({status: false, msg: error.message })
    }
}
 module.exports = {Authentication,authorisation}