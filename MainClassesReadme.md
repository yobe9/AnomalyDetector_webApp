### Data Flow:
The user uploads train and test csv files and choose a algorithm from the algorithms menu, and presses "Upload".
The server loads the files and the fetch the chosen algorithm.
Then the server invoke the model and passes the data to it.
The model uses the dll files to find anomalies.
After the detection ended the model send a json object back to the server, then the server passes the json object to the view.
The view present the data of the json file in a users-friendly format.

- #### Main Classes Description

  - ##### Server - runs the server with the html page and alowing the user to upload the csv files and choose the algorithm. The server invoke the model to detect the anomalies and the view to present them.
  - ##### anomaliesModel - takes the csv files and creates from them an  a input text file accroding to the dll required format. fetch the chosen algorithm and invokes it. Reads the output text file that has been created reformat it to a json file and pass it back to the contorller.
  - ##### index - html file that includes two file upload boxes, algorithm scroll bar, upload button and iframe for the detection result. 


 

