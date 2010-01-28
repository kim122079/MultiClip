var MAX_CLIPPINGS = 5;
var clipKeysID = "clipData";
var itemCount = 0;

const extension = chrome.extension;
      extension.onConnect.addListener(function(port) { 
        port.onMessage.addListener(function(data) {
          if (data.clip && data.clip != "")  
	        var snapshot = false; 
		chrome.tabs.captureVisibleTab(null, function(dataUrl) {
						snapshot = true;
						storeClipping(data.clip, data.URL, dataUrl);
						}
		);
		if(snapshot) {
			storeClipping(data.clip, data.URL, "");
		}
        });
});

function storeClipping(text, URL, snapshot) {
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
	clipItem.originURL = URL;
	clipItem.clippedText = text;
	clipItem.snapshotURL = snapshot;
	
	if(clipIDs.length >= MAX_CLIPPINGS) {
		var clipID = clipIDs.pop();
		removeClip(clipID);
	}
	
	setClip(newClipID, JSON.stringify(clipItem));
	clipIDs.unshift(newClipID);

	setClip(clipKeysID, clipIDs);

	itemCount++;
}

function getClippings() {
	return getClip(clipKeysID);
}

function setClip(key, value) {
	try {
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
	}catch(e) {
		console.log("Error writing item to localstorage");
		console.log(e);
	}
	console.log("Return from setItem" + key + ":" +  value);
}

function removeClip(key) {
	try {
		window.localStorage.removeItem(key);
	}catch(e) {
		console.log("Error removing item from localstorage");
		console.log(e);
	}
}

function getClip(key) {
	var value;
	console.log('Get Item:' + key);
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
	console.log("Error inside getItem() for key:" + key);
	 	 console.log(e);
	  	value = null;
	}
	console.log("Returning value: " + value);
	return value;
}

function flushClippings() {
	window.localStorage.clear();
}
