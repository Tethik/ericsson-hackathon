var username = "tethik" + Math.random()*10;

var PingDom = {
	
	connection: {},
	sessions: {},

	
	init: function() {
		connection = new RTCMultiConnection("tethik");

		connection.session = {
			data: true  // this line suggests that don't get/use audio/video; 
						// only setup data connection
		};
		
		connection.userid = username;
		
		connection.onNewSession = function(session) {
			if (PingDom.sessions[session.sessionid]) return;
			PingDom.sessions[session.sessionid] = session;
			$("#chat").text(JSON.stringify(PingDom.sessions));
			console.log(PingDom.sessions);
			var a = $("<a></a>");
			a.click(function() {
				console.log("Downloading!!!" + session.sessionid);
				connection.join(session.sessionid);
			});
			$("#available-files").append($("<div></div>").append(a.append(session.sessionid)));
		};
		
		connection.connect();
		
		connection.onconnected = function(event) {
			connection.open();
		};
		
		connection.onopen = function(event) {
			console.log(event.userid + "connected");
			$("#chat").text($("#chat").text() + "\n<b>" + event.userid + " connected.</b>");
			document.getElementById('input-text-chat').disabled = false;
		}

		connection.onmessage = function(event) {
			$("#chat").text($("#chat").text() + "\n" + event.data);
		};

		// send single file or multiple files concurrently!
		document.getElementById('input-text-chat').onkeyup = function(e) {
			if(e.keyCode != 13) return; // if it is not Enter-key
			var value = this.value.replace(/^\s+|\s+$/g, '');
			if(!value.length) return; // if empty-spaces
			
			connection.send( value );
			$("#chat").text($("#chat").text() + "\nYou: " + event.data);
			this.value = '';
		};
		
		document.getElementById("file-input").onchange = function(e) {
			UploadRoom.upload(e.target.files[0]);
			connection.send("Hosting: " + e.target.files[0]);
		};
	},
	
	ping: function(userid) {
		
	},
}
