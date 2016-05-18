var fs = require("fs");
var xmlBuilder = require('xmlbuilder');


//Constructor for File operations
var FileOperations = function(){

}

//Method to read a file
FileOperations.prototype.readFile = function(success, error){
	 // body...  

	 //Check whether file exists or not
	fs.stat('records.json', function(err, stat) {
    	
    	//file exists
    	if(err == null) {
        	//console.log('File exists');
        	fs.readFile('records.json', 'utf8', function (errRead, data) {
	  		if (errRead)
	  		{ 
	  			console.log('Error in reading file. :(');
	  			error(errRead);
	  		}
	  		//Check validity of JSON data
	  		try{
	  			success(JSON.parse(data));
	  		}
			catch(e){
				console.log('Invalid JSON');
				//error(errRead);
			}
			})
        }

        //If file does not exists
        else if(err.code == 'ENOENT') {
        	//fs.writeFile('log.txt', 'Some log\n');
        	console.log('File Does not exist');
       	} 
    	else {
       		 console.log('Some other error: ', err.code);
    	}
    });
	 
};

FileOperations.prototype.sort = function(data){
	data.students.sort(function(a, b){return b.score-a.score});
}

//Method to write into text file after sorting all the data
FileOperations.prototype.sortWriteToTextFile = function(data){
	 // body... 
	 var students='Id|First Name|Last Name|Score \n';
	 
	// data.students.sort(function(a, b){return b.score-a.score});
	 data.students.forEach(function(student){
   		
	 students+= student.id+'|'+student.fName +'|'+student.lName+'|'+student.score+'\n';
	 	
	});

	  fs.writeFile("destination.txt", students, function (err) {
       		if(err) {
         		console.log(err);
       		}

       		//console.log('destination.txt created succesfully!')
    	});
};

//Method to create and write into XML file
FileOperations.prototype.writeToXMLFile = function(data){
	 var root = xmlBuilder.create('students');

	 data.students.forEach(function(student){
   		
   		var studentElement = root.ele('student').att('id', student.id);	
   		studentElement.ele('name', student.fName + ' '+ student.lName);
   		studentElement.ele('score', student.score);
   		
	});

	 fs.writeFile("destination.xml", root, function (err) {
       		if(err) {
         		console.log(err);
       		}

       		//console.log('destination.xml created succesfully!')
    	});
	 
}

module.exports = FileOperations;