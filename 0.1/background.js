var clipKeysID = "clipData";
var itemCount = 0;
var badgeCount = 0;
var curPort;

var options = {
	get clipboardsize() {
        if(getClip("clipboardsize") == 'NaN' || getClip("clipboardsize") == null) return 3;
		return getClip("clipboardsize");
	},
	set clipboardsize(val) {
		setClip("clipboardsize", val);
	},
	get screenshot() {
		if(getClip("screenshot") == null) return true;		
		return getClip("screenshot") == 'true' ? true : false;
	},
	set screenshot(val) {
		setClip("screenshot", val);
	},
	get dialogonmouseup() {
		if(getClip("dialogonmouseup") == null) return true;		
		return getClip("dialogonmouseup") == 'true' ? true : false;
	},
	set dialogonmouseup(val) {
		setClip("dialogonmouseup", val);
	},
	get statusmessages() {
		if(getClip("statusmessages") == null) return true;				
		return getClip("statusmessages") == 'true' ? true : false;
	},
	set statusmessages(val) {
		setClip("statusmessages", val);
	}
};

const extension = chrome.extension;
      extension.onConnect.addListener(function(port) { 
	curPort = port;
	curPort.postMessage({clipDialog: {status:options.dialogonmouseup}});
	var badgeText = getClip("badgeText");
	if(badgeText == "null")
		updateBadge("0");
	else
		updateBadge(badgeText);	
	port.onMessage.addListener(function(data) {
          if (data.clip && data.clip != "")  
	        var tab = port.sender.tab;
		var clip = data.clip
		if(options.screenshot) {		
			chrome.tabs.captureVisibleTab(null, function(dataUrl) {
							storeClipping(clip, tab, dataUrl);
							copyToClipboard(clip, "Text copied to clipboard.");
							}
			);
		}
		else {
			storeClipping(clip, tab, "");
			copyToClipboard(clip, "Text copied to clipboard.");
		}
        });
});

function postStatusMessage(text) {
	if(options.statusmessages) { 
		curPort.postMessage({status:text});
	}
}

function copyToClipboard(text, status) {
      var mockTextArea = document.getElementById("mock_ta");
      mockTextArea.value = text;
      mockTextArea.select();
      document.execCommand("copy"); 
      postStatusMessage(status);
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
	
	console.log(options.clipboardsize);
	console.log(options.screenshot);
	console.log(options.dialogonmouseup);
	console.log(options.statusmessages);
	if(clipIDs.length >= options.clipboardsize) {
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
	var badgeText = "" + badgeCount;
	setClip("badgeText", badgeText);	
	chrome.browserAction.setBadgeText({"text": badgeText});
}

function getClippings() {
	return getClip(clipKeysID);
}

function removeClippings() {
	var clipIDs = getClip(clipKeysID).split(",");
	
	for(var i = 0; i<clipIDs.length; i++) {
		removeClip(clipIDs[i]);		
	}
	removeClip(clipKeysID);
	updateBadge(0);
}

function removeClipping(key) {
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
