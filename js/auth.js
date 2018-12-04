var AUTH = {};
AUTH.authenticated = function() {};
AUTH.settings = {
	removeIframe: true
};
AUTH.AUTH = function() {
	AUTH.ready = false;
	AUTH.frame = null;
	AUTH.token = null;
	AUTH.send = function() {
		var frames = document.getElementsByTagName('iframe');
		var count = 0;
		while(frames.length > count) {
			AUTH.frame = frames[count++];
			if(AUTH.frame.src == 'https://login.belowaverage.org/' || AUTH.frame.src == 'https://login.belowaverage.org/#logout') {
				AUTH.frame.contentWindow.postMessage(undefined, 'https://login.belowaverage.org');
				break;
			}
		}
	};
	onmessage = function(e) {
		if(!AUTH.ready && e.data == 'ready') {
			clearInterval(AUTH.interval);
			AUTH.ready = true;
		} else {
			if(AUTH.ready && e.data.length == 32) {
				AUTH.token = e.data;
				AUTH.authenticated();
			} else if(AUTH.ready && typeof e.data == 'object' && typeof e.data.username == 'string' && typeof e.data.password == 'string') {
				AUTH.credential = e.data;
				AUTH.authenticated();
			}
			if(AUTH.settings.removeIframe) {
				AUTH.frame.remove();
			}
		}
	};
	AUTH.interval = setInterval(AUTH.send, 5);
}
window.onload = AUTH.AUTH;