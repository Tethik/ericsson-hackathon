var UploadRoom = {
	
	channels: [],
	
	upload: function(file) {
		connection = new RTCMultiConnection("tethik");
		
		connection.session = {
			data: true  // this line suggests that don't get/use audio/video; 
						// only setup data connection
		};
		
		//~ 
		connection.open(file.name);
		
		connection.onopen = function(event) {
			connection.send(file);
		};
		
		$("#active-uploads").append($("<div></div>").append(file.name));
	}
	
	


};
