var username = "tethik" + Math.random()*10;

var UploadRoom = {
	connections: [],

	upload: function(file) {
		connection = new RTCMultiConnection("tethik");
		connection.userid = username;
		connection.session = {
			data: true  // this line suggests that don't get/use audio/video;
						// only setup data connection
		};

		connection.open(file.name);

		connection.onopen = function(event) {
			console.log(JSON.stringify(event));
			connection.send(file);
		};

		UploadRoom.connections.push(connection);
		a = $("<a></a>");
		a.click(function() {
			UploadRoom.connections.splice(UploadRoom.connections.indexOf(connection), 1);
			connection.leave();
			connection.disconnect();
		});
		$("#active-uploads").append($("<div></div>").append(a));
		a.append(file.name);
	}
};
