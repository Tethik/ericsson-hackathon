var Downloader = {
	
	download: function(sessionid) {		
		var connection = new RTCMultiConnection("tethik");
		connection.userid = username+"dl"+Math.random();
		connection.session = { data: true }; 
		connection.log = false;		
		connection.autoSaveToDisk = false;
		
		$("#download-finished").hide();
		$("#myModal").modal({ backdrop: true, show: true });
		$("#myModalLabel").text("Downloading... " + sessionid);
		
		connection.onFileStart = function(event) {
			console.log("File start triggered.");
			$("#download-body > progress").value = 0;
			$("#download-body > label").text("0%");
		};
		
		connection.onFileProgress = function (chunk, uuid) {
			console.log("File progress triggered.");
			console.log(JSON.stringify(chunk));
			//~ console.log(JSON.stringify(uuid));
			var perc = 100.0 * chunk.currentPosition / chunk.maxChunks;
			$("#download-body > progress").attr('value', perc);
			$("#download-body > label").text(perc.toFixed(2) + "%");
			//~ Downloader.updateLabel($("#download-body > progress"), $("#download-body > label"));
		};
					
		connection.onFileEnd = function(file) {
			console.log("File end triggered.");
			$("#download-body > progress").attr('value', 100);
			$("#download-body > label").text("100%");
			$("#download-finished").show();
			console.log(JSON.stringify(file));
			console.log($("#download-a"));
			$("#download-a").attr('href', file.url);
			$("#download-a").attr('download', file.name);
			connection.leave();
			connection.disconnect();
		};
		
		connection.connect();
		connection.join(sessionid);
	},
	
	

};
