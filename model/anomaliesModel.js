const fs = require('fs')
const ffi = require('ffi-napi')

//setting the functions call of the dll files
const circleAnom = new ffi.Library('../controller/circlealgodll.dll', {
    "findAnomalies": [
        "void", []
    ]
});


const lineAnom = new ffi.Library('../controller/linealgodll.dll', {
    "findAnomalies": [
        "void", []
    ]
});

async function circleWrap() {
    circleAnom.findAnomalies();
}

async function lineWrap(){
    lineAnom.findAnomalies();
}

//writing the csv files to txt format and activating the dll's function according to the algorithm choice
function findAnomalies(trainCSV, testCSV, algoChoice) {
    var result = trainCSV.data.toString()
    var result2 = testCSV.data.toString()
    fs.writeFileSync("./input.txt", "1\n")
    fs.appendFileSync("./input.txt", result)
    fs.appendFileSync("./input.txt", "done\n")
    fs.appendFileSync("./input.txt", result2)
    fs.appendFileSync("./input.txt", "done\n2\n0.5\n3\n4\n6\n")

    if(algoChoice === "line"){
        lineWrap();
    }
    else if (algoChoice === "circle") {
        circleWrap();
    }


    //creating json file from the txt result of the anomalies detector
    let retValue = "{\"key\": ["
    let words = []
    let fields = []
    let withoutTab = []

    var outfile = fs.readFileSync("../controller/output.txt", "utf-8")
    var a = outfile.split("\n"),
        i;

    for (i = 0; i < a.length; i++) {
        words = a[i].split(' ')
        withoutTab = a[i].split('\t')
        if (words.length > 1) {
            fields = words[1].split('$')

            retValue = retValue + JSON.stringify({line: withoutTab[0], field1: fields[0], field2: fields[1]}) + ",\n"
        }
    }
    retValue = retValue.substring(0, retValue.length - 2)
    retValue = retValue + "]}"
    return retValue
}

module.exports.findAnomalies = findAnomalies