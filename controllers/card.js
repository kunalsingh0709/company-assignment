const cardModel = require('../models/cardModel')

const customerModel = require("../models/customerModels")

exports.createCard = async function(req,res){
    try {
        let data = req.body

        let { cardNumber, cardType, customerName, status, vision, customerID } = data

    if(Object.keys(data).length == 0){
        return res.status(400).send({status:false, msg:"Please provide data in body"})
    }
    let findId = await customerModel.findOne({_id:customerID})
    if(!findId){
        return res.status(400).send({status:false, msg:"Customer not found"})
    }
    
    let createData = await cardModel.create(data)
    return res.status(201).send({status:true, data:createData})
    }
   catch(err){
    return res.status(500).send({status:false, msg:err.message})
   } 
}

exports.list = async function(req,res){
    try{
        let cardList = await cardModel.find()
    return res.status(200).send({status:true, data:cardList})

    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
       } 
}