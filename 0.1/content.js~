var toogle;
const extension = chrome.extension;
const port = extension.connect({name: "clipper"});

function postSelectedText() {
	var text = window.getSelection().toString();	
	if (text != '') {
		port.postMessage({clip: text});
		dismissDialog();
	} 
}

function showDialog() {
    	$('body').append(
    	'<div id="dialog"><a id="clip">clip</a></div>');
	$("#dialog:hidden").toggle("def");
	$('#clip').mousedown(function(){
   	   postSelectedText();
    	});
}

function dismissDialog() {
	$("#dialog").toggle("def",function(){
   	   $("#dialog").remove();
    	});
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 67) {
		showDialog();
    	}
});

//$().mousedown()(function() { 
//       showDialog() 
//});

