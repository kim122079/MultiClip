const port = chrome.extension.connect({name: "MultiClip"});
var pageX;
var pageY;
var clipDialog = true;

port.onMessage.addListener( function(msg) {
  if (msg.status)
    	showStatusMsg(msg.status);
});

function postSelectedText(text) {
	if (text != '') {
		port.postMessage({clip: text});
	} 
}

$().keypress(function(event) {
	//3 == Strg+Shift+C
    	if (event.which == 3) {
		postSelectedText(window.getSelection().toString());		
    	}
});

$().mousemove(function(event){
	pageX = event.pageX;
	pageY = event.pageY;
});


$().mouseup(function(){
	if(clipDialog)	
		showDialog(pageX, pageY);
});

function showDialog(xPos, yPos) {
	var selection = window.getSelection().toString();
	var active;
	if(selection != null && selection != "") {
		active = true;		
		$('body').append('<div id="dialog">clip</div>');
		$("#dialog").css("left", xPos-2).css("top", yPos-46);
		$("#dialog:hidden").toggle("fast");	
		$().mousedown(function(){
			if(active) {
				$("#dialog").toggle("fast",function(){
	   	   			$("#dialog").remove();
					active = false;
    				});	
			}
		});

		$("#dialog").mousedown(function(){
			postSelectedText(selection);
		});
		setTimeout(function() {
			$("#dialog").toggle("fast",function(){
   	   			$("#dialog").remove();
    			});
		},3000);
	}
}
