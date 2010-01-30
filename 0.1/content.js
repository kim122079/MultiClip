const port = chrome.extension.connect({name: "MultiClip"});

port.onMessage.addListener( function(msg) {
  if (msg.status)
    	showStatusMsg(msg.status);
});

function postSelectedText() {
	var text = window.getSelection().toString();
	if (text != '') {
		port.postMessage({clip: text});
	} 
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 3) {
		postSelectedText();		
    	}
});
