var async = require('async');
var FileOperations = require('./FileOperations.js');

var fileop = new FileOperations();

var AsyncOperations = function(){

}


AsyncOperations.prototype.series = function(){

	async.series([
		function(callback){
			fileop.readFile(function(data){	
				fileop.sort(data);
				fileop.sortWriteToTextFile(data);
			});
		
			callback();
		},
		function(callback){
			fileop.readFile(function(data){	
				fileop.sort(data);
				fileop.writeToXMLFile(data);
			});
			
			callback();
		}

	], function(){
		console.log('Asynchronous series operations complete')
	});		
}


AsyncOperations.prototype.parallel = function(){

	async.parallel([
		function(callback){
			fileop.readFile(function(data){	
				fileop.sort(data);
				fileop.sortWriteToTextFile(data);
			});
		
			callback();
		},
		function(callback){
			fileop.readFile(function(data){	
				fileop.sort(data);
				fileop.writeToXMLFile(data);
			});
			
			callback();
		}

	], function(){
		console.log('Asynchronous parallel operations complete')
	});		
}


module.exports = AsyncOperations;