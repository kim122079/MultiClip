var toogle;
const extension = chrome.extension;
const port = extension.connect({name: "clipper"});

function postSelectedText() {
	var curURL = window.location.href;	
	var text = window.getSelection().toString();	
	if (text != '') {
		port.postMessage({clip: text, URL: curURL});
	} 
}

function showDialog() {
    	$('body').append(
    	'<div id="dialog">text clipped!</div>');
	$("#dialog:hidden").toggle("normal", function(){
   	   sleep(1000);
    	});
}

function dismissDialog() {
	$("#dialog").toggle("normal",function(){
   	   $("#dialog").remove();
    	});
}

function sleep(ms) {
 	var now=(new Date()).getTime(); 
        var sleepTime = now + ms; 
        while((new Date()).getTime() < sleepTime) { };
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 3) {
		postSelectedText();		
		showDialog();
                dismissDialog()
    	}
});
