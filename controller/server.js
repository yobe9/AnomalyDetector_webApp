const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../model/anomaliesModel')
const fs = require('fs')

//creating server and uses from required libraries
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())
app.use(express.json())
app.use(express.static('../view'))

//http get request to server
app.get('/',(request, response) => {
    response.sendFile('./index.html')
})

//http post request to server
app.post('/detect', (request,response) => {
    //getting the input files from the client and sends them to the model
    if(request.files) {
        let trainCSV = request.files.train_file
        let testCSV = request.files.test_file
        let choice = request.body.algoChoice

        let str = model.findAnomalies(trainCSV, testCSV, choice)

        //writing the result to a json file
        fs.writeFile('../view/result.json', str, (err) => {
            if (err) throw err;
        });

        //returning the json file to the view-client
        response.write(str)

    }
    response.end()


})

app.listen(8080)