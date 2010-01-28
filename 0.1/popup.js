function init() {
	var clippings = chrome.extension.getBackgroundPage().getClippings();	
	updateValues(clippings);
}
      
function updateValues(clippings) {
	$("#clipList").innerHTML = "";	
	if(clippings.clip1 != "" && clippings.clip1 != "undefined")
		$("#clipList").append('<li id="clip1"><p>' + clippings.clip1 + '</p><a>copy</a><a class="delete">remove</a></li>');
	
	if (clippings.clip2 != "" && clippings.clip2 != "undefined")
		$("#clipList").append('<li id="clip2"><p>' + clippings.clip2 + '</p><a>copy</a><a class="delete">remove</a></li>');

	$(".delete").mousedown(function(){
		   var clipID = $(this).parent().attr("id");
		   var parent = $(this).parent();
		   parent.slideUp("fast",function(){
			var parent1 = parent;   	       	   
			parent.remove();
   		   });
	chrome.extension.getBackgroundPage().setItem(clipID,"");
	});
}

function copyTextToClipboard(text) {
	var clip = new ZeroClipboard.Client();
        clip.setText(text);
        clip.glue('d_clip_button');
}
