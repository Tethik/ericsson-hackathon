

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
				connection.join(session.sessionid);
				
				//~ connection.onFileEnd = function(event) {
					//~ connection.leave();
				//~ }
			});
			
			if(session.userid != username) {
				$("#active_downloads").append($("<li></li>").append(a.append(session.userid + ": " + session.sessionid)));
			}
		};
		
		connection.connect();
		
		connection.onconnected = function(event) {
			connection.open();
		};
		
		connection.onopen = function(event) {
			console.log(event.userid + "connected");
			//$("#chat").text($("#chat").text() + "\n<b>" + event.userid + " connected.</b>");
		}

		connection.onmessage = function(event) {
			//$("#chat").text($("#chat").text() + "\n" + event.data);
		};
	}
}
