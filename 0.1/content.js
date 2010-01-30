var toogle;
const extension = chrome.extension;
const port = extension.connect({name: "multiClip"});

function postSelectedText() {
	var curURL = window.location.href;	
	var text = window.getSelection().toString();
	if (text != '') {
		port.postMessage({clip: text, URL: curURL});
	} 
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 3) {
		postSelectedText();		
		showStatusMsg("Text clipped!");
    	}
});
