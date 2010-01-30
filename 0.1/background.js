var MAX_CLIPPINGS = 5;
var clipKeysID = "clipData";
var itemCount = 0;
var badgeCount = 0;


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) { 
          if (request.clip && request.clip != "") {
		var tab = sender.tab;
		var clip = request.clip
		chrome.tabs.captureVisibleTab(null, function(dataUrl) {
						storeClipping(clip, tab, dataUrl);
						copyToClipboard(clip);
						sendResponse({text:"Text clipped!"});
						}
		);
        }
});

function copyToClipboard(text) {
      var mockTextArea = document.getElementById("mock_ta");
      mockTextArea.value = text;
      mockTextArea.select();
      document.execCommand("copy"); 
}

function storeClipping(text, tab, snapshot) {
	var clipIDs;
        
        var clipData = getClip(clipKeysID);	
	if(clipData == null) {
		clipIDs = new Array()		
	}
	else {
		clipIDs = clipData.split(",");	
	}

	var newClipID = new Date().getTime().toString();

	var clipItem = new Object();
	clipItem.URL = tab.url;
	clipItem.clippedText = text;
	clipItem.snapshotURL = snapshot;
	
	if(clipIDs.length >= MAX_CLIPPINGS) {
		var clipID = clipIDs.pop();
		removeClip(clipID);
	}
	
	setClip(newClipID, JSON.stringify(clipItem));
	clipIDs.unshift(newClipID);

	setClip(clipKeysID, clipIDs);

	updateBadge(clipIDs.length);

	itemCount++;
}

function updateBadge(badgeCount) {
	chrome.browserAction.setBadgeText({"text": "" + badgeCount});
}

function getClippings() {
	return getClip(clipKeysID);
}

function removeClippings(key) {
	var newClipIDs = new Array();		
	var oldClipIDs = getClip(clipKeysID).split(",");
	
	if(oldClipIDs.length == 1) {	
		removeClip(clipKeysID);
	}
	else {	
		for(var i = 0; i<oldClipIDs.length; i++) {
			if(oldClipIDs[i] != key) {
				newClipIDs.unshift(oldClipIDs[i]);
			}
		}
		setClip(clipKeysID, newClipIDs);
	}

	removeClip(key);
	updateBadge(newClipIDs.length);
}

function setClip(key, value) {
	try {
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
	}catch(e) {
		console.log("Error writing item to localstorage for key: " + key + " value: " + value);
		console.log(e);
	}
}

function removeClip(key) {
	try {
		window.localStorage.removeItem(key);
	}catch(e) {
		console.log("Error removing item to localstorage for key:" + key);
		console.log(e);
	}
}

function getClip(key) {
	var value;
	console.log('Get Item:' + key);
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
	console.log("Error getting item to localstorage for key:" + key);
	 	 console.log(e);
	  	value = null;
	}
	return value;
}

function flushClippings() {
	window.localStorage.clear();
	updateBadge(0);
}
