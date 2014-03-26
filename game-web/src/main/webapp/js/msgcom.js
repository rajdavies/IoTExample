function StompConnect() {

	var url = $("#url").val();
	var username = $("#username").val();
	var password = $("#password").val();
	var destinationScore = $("#destinationScore").val();
	var destinationControl = $("#destinationControl").val();
	var destinationResult = $("#destinationResult").val();

	console.log("url = " + url + " dest = " + destinationScore + " dest control = " + destinationControl + " dest result = " + destinationResult +" uname = " + username + " pass = " + password);
	StompConnect.client = Stomp.client(url, "v11.stomp");
	StompConnect.client.heartbeat.outgoing = 10000;
	StompConnect.client.heartbeat.incoming = 10000;
	StompConnect.connected = false;
	StompConnect.playView = new PlayView();


	var onconnect = function(frame) {
			StompConnect.client.subscribe(destinationScore, function(message) {
				var value = JSON.parse(message.body);
				StompConnect.playView.onScore(value.name,value.score);
			});

			StompConnect.client.subscribe(destinationResult, function(message) {

			});
			//enable disabled menu
			$("#Connect").addClass('disabled');
			$("#Disconnect").removeClass('disabled');
			$("#StartGame").removeClass('disabled');
			StompConnect.connected = true;

		}

	var onError = function(frame) {
			if (StompConnect.connected) {
				StompConnect.connected = false;
				var error = "WebSocket Connection Error =" + frame;
				console.log(error);
				alert(error);
				stompDisconnect();
			} else {
				var error = "Could not connect to  " + url + "Got an error: " + frame;
				console.log(error);
				alert(error);
			}

		};

	StompConnect.client.connect(username, password, onconnect, onError);
	window.location = "#close";
	return false;
}

function stompDisconnect() {
	StompConnect.connected = false;
	if (StompConnect.client.connected) StompConnect.client.disconnect(function() {
		console.log("Disconnected ");
	});
	$("#Connect").removeClass('disabled');
	$("#Disconnect").addClass('disabled');
	$("#StartGame").addClass('disabled');
	$("#StopGame").addClass('disabled');

	window.location = "#close";
	PlayView.prototype.close();
}

function doStartGame() {
	$("#StartGame").addClass('disabled');
	$("#StopGame").removeClass('disabled');
	console.log("Starting");
	StompConnect.client.send(destinationControl, {}, "starting game ...");
	var doStart = function() {
			if (StompConnect.client.connected) {
				StompConnect.client.send(destinationControl, {}, "START");
			}
		}
	sleep(2000, doStart);
}

function doStopGame() {
	$("#StartGame").removeClass('disabled');
	$("#StopGame").addClass('disabled');
	console.log("Stopped game");
}

function sleep(millis, callback) {
	setTimeout(function() {
		callback();
	}, millis);
}
