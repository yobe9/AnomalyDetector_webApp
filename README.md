# Anomalies Detection Web App
### General
In this project, we built a web application , which allows us inspect  flight-related data and showing the flight's anomalies.
The project includes MVC  architecture,Client-Server architecture, and unsynchronized programming.

### Emphasis for examiner
- #### dll asumptions
  - We assumed the app is runnning on 64-bit system, we also included a x86 win32 versions of the dlls in the controller so you can change the name of the loaded dll in the server file accroding to your system.
  - We changed the threshold value in the mincircle algorithm, to detect more anomalies.  

### Repositories structure
- Controller folder - contains the server and  the dll files of the minimal circle and the regression line algorithms.
- Model folder - contains the anomalies model which is responsible to run the currect dll file with the given csv files.
- View folder - contains the index.html file that is the GUI of the app.
The GUI offers the following options:
	- Upload  train and test csv files.
	- Choose a detection algorithm from the algorithms menu.
	- View the detected anomalies in a user's-friendly format.
  
- #### dll logic
  In order to work with dll files we did as follows:
  - We used a node.js library calls "ffi-napi".
  - the "ffi-napi" library allowed us to load the dll file and the "findAnomalies()" function from inside the dll.
  - We wrapped our dll function in a async function.
  - We called  the method which used the flight data stored in the input.txt to be loaded, processed, detect anomalies and write them into the output.txt file.


### Packages requirements
- In order to continue developing the project, the following packages must be installed :
	- Controller:
		- express
		- express-fileupload
		- node-gyp
	- Model:
		- ffi-napi


### Installing Instructions
- Clone the repo
- Install the packages
- Make sure that the python and visual studio c++ build environment is up to date.


### Links
- ReadMe of the Main classes - [MainClassesReadme](MainClassesReadme.md)
### Video
[The video with sound](Media/FG_Video.mp4) - need to download before watching.
![](Media/FG_gif.gif)

