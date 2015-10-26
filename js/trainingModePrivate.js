

//Display the one image corresponding to the random number and black out the rest
var i;
var rand = sessionStorage["generatedNumber"];
var imageSources = ["images/romit.png", "images/randy.png", "images/nirupam.png", "images/mahanth.png", "images/obama.png", "images/michael-jordan.png",
                    "images/bill-gates.png","images/taylor-swift.png"];

for(i = 1; i<=4 ;i++){
	if(i != rand){
		document.getElementById(i.toString()).src = "images/blackbox.png";
	}else{
		document.getElementById(i.toString()).src = imageSources[i-1];
		
	}
}

//set the correct mode and ON and OFF lengths so the html elements display the correct value
if(localStorage["mode"]){
	if(localStorage["mode"] == "training"){
		document.getElementById("isLearning").checked = true;
	}else{
		document.getElementById("isLearning").checked = false;
	}
	
}
if(localStorage["onLength"]){
	var onSelect = document.getElementById("on-length");
	onSelect.value = localStorage["onLength"];
}
if(localStorage["offLength"]){
	var offSelect = document.getElementById("off-length");
	offSelect.value = localStorage["offLength"];
}


/*
 * Generate vibration 
 */
function generateVibration(){
	
	var imageSources = ["images/romit.png", "images/randy.png", "images/nirupam.png", "images/mahanth.png", "images/obama.png", "images/michael-jordan.png",
	                    "images/bill-gates.png","images/taylor-swift.png"];
	
	var pattern = [];
	var rand = Math.floor((Math.random() * 8) + 1);
	
	if(!localStorage["mode"]){
		localStorage["mode"] = "training";
	}
	
	if(localStorage["mode"] == "training"){
		var i;
		for(i = 1; i<=8 ;i++){
			if(i != rand){
				document.getElementById(i.toString()).style.visibility = "hidden";
				console.log("should be hidden: " + document.getElementById(i.toString()).style.visibility);
			}else{
				document.getElementById(i.toString()).style.visibility = "visible";
				
				console.log("should not be hidden: " +document.getElementById(i.toString()).style.visibility);
			}
		}
	}else{
		for(i = 0; i<=8 ;i++){
			
			document.getElementById(i.toString()).visibility = "visible";
			
		}
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
    }else if(localStorage["offLength"]){
    	offLength = localStorage["offLength"];
    }
	if(rand < 5){
		pattern.push(onLength*8/(5-rand));
	}else{
		var i;
		for(i = 0; i<rand-4; i++){
			pattern.push(onLength);
			pattern.push(offLength);
		}

	}
	
	try{
		navigator.vibrate(pattern);
	}catch(err){
		console.log(err.message);
	}

}

function onLengthChanged(){
	var onSelect = document.getElementById("on-length");
	
	localStorage["onLength"] = onSelect.options[onSelect.selectedIndex].value; 
}

function offLengthChanged(){
	var offSelect = document.getElementById("off-length");
	
	localStorage["offLength"] = offSelect.options[offSelect.selectedIndex].value; 
}




function changeMode(element){
	if(localStorage["mode"]){
		if(localStorage["mode"] == "training"){
			localStorage["mode"] = "test";
		}else{
			localStorage["mode"] = "training";
		}
		
	}else{
		if(element.checked){
			localStorage["mode"] = "training";
		}else{
			localStorage["mode"] = "test";
		}
	}
}

function toDispatcher(){
	localStorage["manualOrAuto"] = "manual";
	window.location.href = "index.html";
	
}

function stopAllAlarms(){
	tizen.alarm.removeAll();
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

