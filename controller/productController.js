const mongoose = require("mongoose")
const productModel=require("../models/productModel")
const { uploadFile } = require("./aws");
const createProduct = async function (req, res) {
    try {
        const data = req.body
         data.userId = req.userId
        const files=req.files
        const { title, description } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "body is blank" })
        }
         
        

        if (!(title)) { return res.status(400).send({ status: false, message: "title is mandatory" }) }

        const valid=function(value){
        if(typeof value=="number" || typeof value==null || typeof value==undefined)     
        return false
         if(typeof value=="string" && value.trim().length==0)
         return false
         return true
        }
        if (!valid(title)) {
            return res.status(400).send({ status: "false", message: "title is invalid" });
        }
        //-------------------------------check description-----------------------------------------------
        if (!(description)) { return res.status(400).send({ status: false, message: "description is mandatory" }) }
        //---------------------------valid Image--------------------------------------------------

        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0]);
            data.image = uploadedFileURL
        } else {
            return res.status(400).send({ msg: "ProductImage is Mandatory" });
        }
        
        const product = await productModel.create(data)
        res.status(201).send({ status: true, data: product})
        
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message }) 
    }
}

const getallproduct = async function (req, res) {
    try {
        const getdata = await productModel.find({});
        res.status(200).send({ status: true, data: getdata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

const updateproduct = async function (req, res) {
    try {
        const Id = req.params.Id
        let {title, description,favourite} = req.body
        let files = req.files
        if (mongoose.Types.ObjectId.isValid(Id) == false) {
            return res.status(400).send({ status: false, message: "Invalid Id" });
        }
        let obj = {};
        if (title) {
            obj.title = title;
        }
        if (description) {
            obj.description=description
        }
        if (files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0]);
            obj.image=uploadedFileURL
        }
        if (favourite) {
            obj.favourite = favourite;
        }
        const updated = await productModel.findOneAndUpdate({_id:Id},obj,{new:true})
      
        res.status(200).send({ status: true, data: updated })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

const deleteProduct = async function (req, res) {
    try {
        let productId = req.params.Id

        if (mongoose.Types.ObjectId.isValid(productId) == false) {
            return res.status(400).send({ status: false, message: "Invalid productId" });
        }
        let deleteProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
        res.status(200).send({ status: true, msg: "product is successfully deleted" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { createProduct, getallproduct, updateproduct, deleteProduct }