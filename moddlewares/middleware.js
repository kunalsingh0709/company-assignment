const jwt = require('jsonwebtoken')

const customerModel = require('../models/customerModels') 

const { isValidObjectId } = require('mongoose')


exports.authentication = async (req, res, next) => {

    try {

        const token = req.headers['x-api-key']

        if (!token) {
            return res.status(400).send({ status: false, message: "Token is required." })
        }

        const decodedToken = jwt.verify(token, 'secret-key', function (err, decodedToken) {
            if (err) {
                console.log("Authentication Failed!!")
                return res.status(401).send({ status: false, message: err.message })
            }
            else {
                req.token = decodedToken
                console.log("Authentication Successful")
            }

            next()
        })
    }

    catch (err) {

        return res.status(500).send({ status: false, message: err.message })
    }
}


exports.authorisation = async (req, res, next) => {

    try {
        const customerId = req.params.customerId

        if (!isValidObjectId(customerId)) {
            return res.status(400).send({ status: false, message: "customerId is invalid." })
        }

        const customerData = await customerModel.findById(customerId)

        if (!customerData) {
            return res.status(404).send({ status: false, message: "No customer found with this Id!" })
        }

        const userId = customerData._id.toString()

        const customerIdfrmDecodedToken = req.token.userId

        if (userId !== customerIdfrmDecodedToken) {
            console.log("Authorization Failed!!")
            return res.status(403).send({ status: false, message: "Access Denied!" })
        }
        
        console.log("Authorization Successful")
        next()
    }

    catch (err) {
        
        return res.status(500).send({ status: false, message: err.message })
    }
}