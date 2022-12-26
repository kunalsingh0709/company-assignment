const express = require('express')
const mongoose = require('mongoose')
const route = require('./services/services')
const app = express()

app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://kunal0709:Singhkunal7@cluster0.u5yk4f2.mongodb.net/company-assignment",
{ useNewUrlParser: true }) 

.then(() => console.log("MongoDB is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.listen(3000,function(){
    console.log("Express is connected",3000)
})