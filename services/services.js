const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customer')

const cardController = require('../controllers/card')

const middleware = require('../moddlewares/middleware')

router.post('/Customer', customerController.createCustomer)

router.post('/login', customerController.login)

router.get('/Customer', customerController.findCustomer)

router.delete('/Customer/:customerId/Delete', middleware.authentication, middleware.authorisation, customerController.delete)

router.post('/Card',cardController.createCard)

router.get('/Card',cardController.list)



module.exports = router