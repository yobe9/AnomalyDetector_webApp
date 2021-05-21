import requests

session = requests.Session()
#assuming that the CSV files are in the same directory as the client(c.py)
files = {"test_file": open("anomaly_flight.csv","rb"),"train_file": open("reg_flight.csv","rb")}
c = input('Enter "line" or "circle" for the type of the algo: ')
payload ={'algoChoice':c}

res = session.post("http://localhost:8080/detect", data=payload, files=files)
print(res.text) #prints the returned data
print(res.url) #prints the url of the response
