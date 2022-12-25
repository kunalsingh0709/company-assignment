const customerModel = require("../models/customerModels")

const jwt = require('jsonwebtoken')

exports.createCustomer= async function (req, res) {

    try{
        let data= req.body

        if(Object.keys(data).length == 0){
            return res.status(400).send({status:false, msg : "Please provide data in body"})
        }

    let savedData= await customerModel.create(data)

    console.log(savedData)
    res.status(201).send({status:true,data:savedData})
    }
   catch(err){
    res.status(500).send({status:false,msg:err.message})
   }
    
}

exports.login = async function (req, res) {

    try {
        let customerID = req.body.customerID
  
        let user = await customerModel.findOne( { customerID:customerID } )
        if (!user)
          return res.send( { status: false, msg: "Customer not found" } )
      
          let token = jwt.sign({userId: user._id.toString()},"secret-key",{ expiresIn: '5h' })
        res.setHeader("x-auth-token", token)
        res.status(200).send({ status: true, token: token, message: "Your token will be expired in 5 hours." })
    }
   catch(err) {
    res.status(500).send({status:false,msg:err.message})
   }
   
  }

  exports.findCustomer= async function (req, res) {

    try {
        let findData= await customerModel.find({status:"ACTIVE"})

    console.log(findData)
    res.status(200).send({status:false,data:findData})

    }
    catch(err) {
        res.status(500).send({status:false,msg:err.message})
       }
    
}
 exports.delete = async function(req,res){

     try {
        let customerId = req.params.customerId

        let deleteCustomer = await customerModel.findOneAndDelete(
            { _id: customerId },
            { new: true }
        )
        if(!deleteCustomer){
            return res.status(400).send({status:false, msg:"Customer not found"})
        }

        return res.status(200).send({status:true, msg:"Customer Deleted"})
     }
     catch(err) {
        res.status(500).send({status:false,msg:err.message})
       }
 }

