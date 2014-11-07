var username = "tethik" + Math.random()*10;

var UploadRoom = {
	uploads: [],

	upload: function(file) {
		var connection = new RTCMultiConnection("tethik");
		connection.log = false;
		connection.userid = username; 
		connection.session = {
			audio: false,
			video: false,
			data: true  // this line suggests that don't get/use audio/video;
						// only setup data connection
		};
		
		
		a = $("<a></a>");
		var elem = $("<div></div>").append(a);
		//~ elem.append($("<h3>Clients</h3>"));
		var elem2 = $("<div class='clients'></div>");
		elem.append(elem2);
		var upload = { e: elem2, c: connection, u: [] };
		UploadRoom.uploads[file.name] = upload;
		
		connection.open(file.name);

		connection.onopen = function(event) {
			console.log("Onopen");
			console.log(JSON.stringify(event));
			upload.u.push(event.userid);
			connection.send(file);
			//~ elem2.empty();
			//~ for(var i = 0; user = upload.u[i]; i += 1)
			//~ {
				//~ elem2.append($("<div><b></b></div>").append(user));
			//~ }
		};
		
		connection.onleave = function(e) {
			console.log("Onleave...");
			console.log(JSON.stringify(e));
			//~ console.log(upload.u.indexOf(e.userid));
			upload.u.splice(upload.u.indexOf(e.userid), 1);
			//~ elem2.empty();
			//~ for(var i = 0; user = upload.u[i]; i += 1)
			//~ {
				//~ elem2.append($("<div><b></b></div>").append(user));
			//~ }
		};
		
		connection.onFileStart = function(e) {};
		
		connection.onFileProgress = function(e) {};
		
		connection.onFileEnd = function(e) {};

		
		a.click(function() {
			delete UploadRoom.uploads[file.name];
			connection.leave();
			connection.disconnect();
		});
		$("#active_uploads").append(elem);
		a.append(file.name);
	}
};
