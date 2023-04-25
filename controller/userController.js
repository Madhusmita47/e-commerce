const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const jwt=require("jsonwebtoken")

const createUser = async function (req, res) {
    try {
        const data = req.body
        const { name, email, password } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "body is empty" })
        }
        //---------------------------Valid Name--------------------------------------------
        if (!(name)) { return res.status(400).send({ status: false, message: "name is mandatory" }) }
        const valid=function(value){
        if(typeof value=="number" || typeof value==null || typeof value==undefined)     
        return false
         if(typeof value=="string" && value.trim().length==0)
         return false
         return true
        }
        if (!valid(name)) {
            return res.status(400).send({ status: "false", message: "name is invalid" });
        }
        //-----------------------------------valid Name format---------------------------------
        const isValidName = function (name) {
            let re = /^[a-z A-Z ]+$/
            return re.test(name)
        };
        if (isValidName(name) == false) { return res.status(400).send({status: false, msg: "name format is invalid" }) }
      //----------------------------------------valid email----------------------------------------------
        if (!(email)) { return res.status(400).send({ status: false, message: "email is mandatory" }) }
        const isValidEmail= function (email) {
         var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
         }
        if (isValidEmail(email) == false) { return res.status(400).send({ status: false, msg: "email format is invalid" }) }
  
      //---------------------------------------valid password---------------------------------------------  
        if (!(password)) { return res.status(400).send({ status: false, message: "password is mandatory" }) }
        const isValidPassword = function(password){
         let re= /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{8,15}$/
         return re.test(password) 
        }
        if (isValidPassword(password) == false) { return res.status(400).send({ status: false, msg: "password format is invalid" }) }
        const createdata = await userModel.create(data )
        res.status(201).send({ status: true, data: createdata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const getalluser = async function (req, res) {
    try {
        const getdata = await userModel.find({});
        res.status(200).send({ status: true, data: getdata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

const userLogin = async function (req, res) {
    let emailId = req.body.email;
    let password = req.body.password;
    try {
     
       
        if (!(emailId || password)) {
            return res.status(400).send({ status: false, msg: "Email Id and Password are mandatory for login" })
        }
       
        let userId = await userModel.findOne({ email: emailId, password: password });
        if (!userId) { return res.status(404).send({ status: false, msg: "user not found with this EmailId and Password", }) }

        let token = jwt.sign(
            {
                userId: userId._id.toString(),
                email: emailId,
                password: password

            },
            "madhu"
        );
        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, data: token });
    } catch (Err) {
        return res.status(500).send({ status: false, msg: Err.message });
    }
};



module.exports = { createUser, getalluser,  userLogin } 