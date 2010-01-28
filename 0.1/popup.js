function init() {
	$("#clipList").innerHTML = "";	

	var clippings = chrome.extension.getBackgroundPage().getClippings();	
	
	if(clippings == null) {
		console.log("failure clippings was null!!!!");		
		return;	
	}
	
	var items = clippings.split("},");

	for(i=0; i<items.length; i++) {
		var item = items[i];	
		if(i != items.length-1)	
			item += "}";
		console.log("item" + item);
		var clipItem = 	JSON.parse(item);
		console.log(clipItem.originURL);
		console.log(clipItem.clippedText);
		if(clipItem != "undefined" && clipItem.clippedText != "") {
			$("#clipList").append('<li><p>' + clipItem.clippedText + '</p><a>copy</a><a class="delete">remove</a></li>');
		}
	}	
	
	$(".delete").mousedown(function(){
		   var clipID = $(this).parent().attr("id");
		   var parent = $(this).parent();
		   parent.slideUp("fast",function(){
			var parent1 = parent;   	       	   
			parent.remove();
   		   });
	//chrome.extension.getBackgroundPage().setItem(clipID,"");
	});	
}
      
function flushStorage() {
	chrome.extension.getBackgroundPage().flushStorage();	
}

function copyTextToClipboard(text) {
	var clip = new ZeroClipboard.Client();
        clip.setText(text);
        clip.glue('d_clip_button');
}
