var toogle;
const extension = chrome.extension;
const port = extension.connect({name: "clipper"});

function postSelectedText() {
	var text = window.getSelection().toString();	
	if (text == '') {
		port.postMessage({clip: text});
	} 
}

$().keypress(function(event) {
	if (event.which == 17) {
	postSelectedText()
    }
});

$('a').mouseover(function() { 
		  postSelectedText() 
});

