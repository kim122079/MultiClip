function init() {
	$("#clipList").innerHTML = "";	

	var clippings = chrome.extension.getBackgroundPage().getClippings();	
	
	if(clippings != null) {
		clipIDs = clippings.split(",");
		for(i=0; i<clipIDs.length; i++) {
			var clipID = clipIDs[i];	
			console.log("clipID: " + clipID);		
		
			var clipItem;
			var item = chrome.extension.getBackgroundPage().getClip(clipID);
			if(item != null) {
				var clipItem = JSON.parse(item);
			}
		
			if(clipItem != "undefined" && clipItem.clippedText != "") {
				$("#clipList").append('<li id="' + clipID + '"><a class="origin" href="' + clipItem.URL + '"><img src="' + clipItem.snapshotURL + '" width="133" height="100"/></a><p class="clippedText">' + clipItem.clippedText + '</p><a class="copy">copy</a><a class="delete">delete</a><a class="origin" href="' + clipItem.URL + '">url<a/></li>');
			}
		}
		
		chrome.browserAction.setBadgeText({"text": "" + clipIDs.length});

		copyTexttoClipboard = function(){
			var text = $(this).prev().text();			
			chrome.extension.getBackgroundPage().copyToClipboard(text, "Text copied.");
		};	

		$(".clippedText").mousedown(copyTexttoClipboard);

		$(".copy").mousedown(copyTexttoClipboard);
		
		
		$(".delete").mousedown(function(){
			   var clipID = $(this).parent().attr("id");
			   var parent = $(this).parent();
			   parent.slideUp("fast",function(){
				var parent1 = parent;   	       	   
				parent.remove();
				chrome.extension.getBackgroundPage().removeClippings(clipID);
	   		   });
		});
		
		$(".origin").mousedown(function(){
			   var href = $(this).attr("href");
			   var activeTabID;
			   
			   chrome.tabs.getAllInWindow(null, function(tabs) {
				for(i=0; i<tabs.length; i++) {
					if(tabs[i].url == href) {
						activeTabID = tabs[i].id;
					}
				}
				
			   });

			   if(activeTabID) {
			   	//Todo remove create and switch to tab with ID and focus...
				chrome.tabs.create({"url":href});
			   }
			   else {
			   	chrome.tabs.create({"url":href});
			   }
		});				
		
		$(".options").mousedown(function(){
			   var href = $(this).attr("href");
			   	chrome.tabs.create({"url":href});
		});	
	}
	else {
		console.log("failure loading clippings");		
		return;		
	}	
}
      
function flushClippings() {
	var clipList = $("#clipList");
	chrome.extension.getBackgroundPage().flushClippings();
	clipList.slideUp("fast",function(){
		clipList.remove();
        });	
}

function copyTextToClipboard(text) {
	alert("Chrome does not support copying text to clipboard yet. Coming soon...")
}
