const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../model/anomaliesModel')


const app = express()
app.use(express.urlencoded({extended: false}))

app.use(fileUpload())
app.use(express.json())

app.use(express.static('../view'))

app.get('/',(request, response) => {
    response.sendFile('./index.html')
})

app.post('/detect', (request,response) => {
    if(request.files) {
        let trainCSV = request.files.train_file
        let testCSV = request.files.test_file
        let choice = request.body.algoChoice

        let str = model.findAnomalies(trainCSV, testCSV, choice)
        response.write(str)

    }
    response.end()


})

app.listen(8080)