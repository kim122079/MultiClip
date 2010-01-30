function postSelectedText() {
	var text = window.getSelection().toString();
	if (text != '') {
		chrome.extension.sendRequest({clip: text});
	} 
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 3) {
		postSelectedText();		
		showStatusMsg("Text clipped!");
    	}
});
