
window.skipRTCMultiConnectionLogs = true;

var PingDom = {
	
	connection: {},
	sessions: {},

	
	init: function() {
		var connection = new RTCMultiConnection("tethik");
		connection.log = false;
		connection.session = {};
		
		connection.userid = username;
		
		connection.onNewSession = function(session) {
			if (PingDom.sessions[session.sessionid]) return;
			PingDom.sessions[session.sessionid] = session;
			$("#chat").text(JSON.stringify(PingDom.sessions));
			console.log(PingDom.sessions);
			var a = $("<a></a>");
			a.click(function() {
				Downloader.download(session.sessionid);
			});
			
			if(session.userid != username) {
				$("#active_downloads").append($("<li></li>").append(a.append(session.userid + ": " + session.sessionid)));
			}
		};
		
		connection.onSessionClosed = function(session) {
			console.log(JSON.stringify(session));
		};
		
		connection.onFileStart = function(event) {
			console.log("File start triggered!");
		};
		
		connection.connect();
		
		connection.onconnected = function(event) {
			connection.open();
		};
		
		connection.onopen = function(event) {
			console.log(event.userid + "connected");
		}
	}
}
