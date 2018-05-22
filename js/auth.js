var AUTH = {};
AUTH.authenticated = function() {};
AUTH.ready = false;
AUTH.interval = null;
AUTH.frame = null;
AUTH.send = function() {
	var frames = document.getElementsByTagName('iframe');
	var count = 0;
	while(frames.length > count) {
		AUTH.frame = frames[count++];
		if(AUTH.frame.src == 'https://login.belowaverage.org/') {
			AUTH.frame.contentWindow.postMessage(undefined, 'https://login.belowaverage.org');
			break;
		}
	}
	
};
onmessage = function(e) {
	if(!AUTH.ready && e.data == 'ready') {
		clearInterval(AUTH.interval);
		AUTH.ready = true;
	} else if(AUTH.ready && e.data.length == 32) {
		AUTH.token = e.data;
		AUTH.authenticated();
		AUTH.frame.remove();
	}
};
$(document).ready(function() {
	AUTH.interval = setInterval(AUTH.send, 100);
});