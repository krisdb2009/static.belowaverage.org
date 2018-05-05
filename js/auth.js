var AUTH = {};
AUTH.authenticated = function() {};
AUTH.ready = false;
AUTH.interval = null;
AUTH.send = function() {
	$('iframe[src=\'https://login.belowaverage.org/\']')[0].contentWindow.postMessage(undefined, 'https://login.belowaverage.org');
};
onmessage = function(e) {
	if(!AUTH.ready && e.data == 'ready') {
		clearInterval(AUTH.interval);
		AUTH.ready = true;
	} else if(AUTH.ready && e.data.length == 32) {
		AUTH.token = e.data;
		AUTH.authenticated();
		$('iframe[src=\'https://login.belowaverage.org/\']').remove();
	}
};
$(document).ready(function() {
	AUTH.interval = setInterval(AUTH.send, 100);
});