



if(!localStorage["manualOrAuto"]){
	localStorage["manualOrAuto"] = "auto";
}


if(localStorage["manualOrAuto"] == "auto"){
	tizen.alarm.removeAll();
	var randAlarm = Math.floor((Math.random() * 30) + 45);
	var alarm = new tizen.AlarmRelative(randAlarm * tizen.alarm.PERIOD_MINUTE);
	tizen.alarm.add(alarm, "5Ou7t2YkQS.NeuroVibe");
	console.log("The alarm will trigger at " + alarm.getRemainingSeconds());
}

generateVibration();


//Dispatch to training/testing modes according to the generated random number
if(localStorage["mode"] == "training"){
	logTrainingModeData();
	if(sessionStorage["generatedNumber"] < 5){
		window.location.href = "trainingModePrivate.html";
	}else{
		window.location.href = "trainingModePublic.html";
	}
}else{
	window.location.href = "testingMode.html";
}


function logTrainingModeData(){
	
	 var generatedNum = sessionStorage.getItem("generatedNumber");
     var pattern = JSON.parse(localStorage["vibrationPattern"]);
     var vibrationStr = "[" + pattern.toString() + "]";
     
     //current people
     var people = ["Romit","Bo-Yi","Nirupam","Mahanth","Obama","Michael Jordan", "Bill Gates", "Taylor Swift"];
     var manualOrAuto = localStorage["manualOrAuto"];
     var onLength = localStorage["onLength"];
     var offLength = localStorage["offLength"];

	var documentsDir, resultFile;
	 tizen.filesystem.resolve(
             'documents',
             function(dir){
               documentsDir = dir;
               
               try{
               	resultFile = dir.resolve("vibrationResponse.txt");
               	console.log("success in resolving the file!")
               }catch(e){ //file already exists
               	console.log("Unsuccessful retriving file " + e.message);
               	resultFile = dir.createFile("vibrationResponse.txt");
               }
               
               if(resultFile != null){
               	resultFile.openStream(
               			   //change to a
                           "a",
                           function(fs){
                             
                             fs.write(timeStamp() + ", " + localStorage["mode"] + ", " + manualOrAuto + ", " + people[generatedNum-1] + ", " + vibrationStr + ", " 
                            		 + onLength + ", " + offLength + ", " + generatedNum  + ", " + "NULL" +  '\r\n');
                             fs.close();
                           }, function(e){
                             console.log("Error " + e.message);
                           }, "UTF-8"
                       );
               }
               
             }, function(e) {
               console.log("Error" + e.message);
             }, "a"
     );
	 localStorage["manualOrAuto"] = "auto";
}



function generateVibration(){
	
	var imageSources = ["images/romit.png", "images/randy.png", "images/nirupam.png", "images/mahanth.png", "images/obama.png", "images/michael-jordan.png",
	                    "images/bill-gates.png","images/taylor-swift.png"];
	
	var pattern = [];
	var rand = Math.floor((Math.random() * 8) + 1);
	
	if(!localStorage["mode"]){
		localStorage["mode"] = "training";
	}

    if ("sessionStorage" in window) 
    {
       sessionStorage.setItem("generatedNumber", rand); //save generated 
       location.reload();
    } 
    else 
    {
       alert("no sessionStorage in window");
    }
    
    var onLength = 150;
    var offLength = 150;
    
    if(localStorage["onLength"]){
    	onLength = localStorage["onLength"];
    }else{
    	localStorage["onLength"] = 150;
    }
    
    if(localStorage["offLength"]){
    	offLength = localStorage["offLength"];
    }else{
    	localStorage["offLength"] = 150;
    }
    
	if(rand < 5){
		pattern.push(rand * onLength*2);
	}else{
		var i;
		for(i = 0; i<rand-4; i++){
			pattern.push(parseInt(onLength,10));
			pattern.push(parseInt(offLength,10));
		}

	}
	
	localStorage["vibrationPattern"] = JSON.stringify(pattern);
	
	console.log(pattern);
	try{
		navigator.vibrate(pattern);
	}catch(err){
		console.log(err.message);
	}

}

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 * https://gist.github.com/hurjas/2660489
 */

function timeStamp() {
	// Create a date object with the current time
	  var now = new Date();

	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

	// Create an array with the current hour, minute and second
	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

	// Determine AM or PM suffix based on the hour
	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

	// Convert hour from military time
	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

	// If hour is 0, set it to 12
	  time[0] = time[0] || 12;

	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {
	    if ( time[i] < 10 ) {
	      time[i] = "0" + time[i];
	    }
	  }

	// Return the formatted string
	  return date.join("/") + " " + time.join(":") + " " + suffix;
}