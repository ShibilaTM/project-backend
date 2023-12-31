const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
require('./config/db')
app.use(morgan('dev'))
const PORT = process.env.PORT
const path=require('path')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'/build')));
const userRoute = require('./routes/userRoute')
const dashRoute = require('./routes/projectdashRoute')
const gradeRoute = require('./routes/gradeRoute')
const referenceRoute = require('./routes/referenceroute')
const commentRoute = require('./routes/commentRoute')
const isloggedinRoute = require("./routes/isloggedinRoute")

app.use('/user', userRoute)
app.use('/dash', dashRoute)
app.use('/grade', gradeRoute)
app.use('/referenceroute', referenceRoute)
app.use('/comments', commentRoute)
app.use('/protection', isloggedinRoute)




const subRoute = require('./routes/projectRoutes')
app.use('/form', subRoute)
const Studentdashboard = require('./routes/Studentdashboard')
app.use('/studentdashboardcheck', Studentdashboard)

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'));
  })

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

