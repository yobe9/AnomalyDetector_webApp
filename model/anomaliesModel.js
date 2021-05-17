const fs = require('fs')
const ffi = require('ffi-napi')

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



    let retValue = ""
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

            retValue = retValue + JSON.stringify({line: withoutTab[0], field1: fields[0], field2: fields[1]}) + "\n"
        }
    }
    return retValue
}

module.exports.findAnomalies = findAnomalies