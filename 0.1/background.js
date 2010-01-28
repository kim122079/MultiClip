var key1 = "clip1";
var key2 = "clip2";
var clip1 = "";
var clip2 = "";

function store(text) {

	var oldText = chrome.extension.getBackgroundPage().getItem(key1);

	shiftClips(text);

	logAllKeyValues();

	setItem(key1,clip1);
	setItem(key2,clip2);
}

function logAllKeyValues() {
	console.log(key1 + ":" + clip1);
	console.log(key2 + ":" + clip2);
}

function shiftClips(newClip) {
	clip2 = clip1;
	clip1 = newClip;
}

function getClippings() {
	var clippings = new Object();
	clippings.clip1 = getItem(key1);
	clippings.clip2 = getItem(key2);
	return clippings;
}

function setItem(key, value) {
	try {
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
	}catch(e) {
		console.log("Error writing item to localstorage");
		console.log(e);
	}
	console.log("Return from setItem" + key + ":" +  value);
}

function getItem(key) {
	var value;
	console.log('Get Item:' + key);
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
	console.log("Error inside getItem() for key:" + key);
	 	 console.log(e);
	  	value = "null";
	}
	console.log("Returning value: " + value);
	return value;
}

function flushStorage() {
	window.localStorage.clear();
}

const extension = chrome.extension;
      extension.onConnect.addListener(function(port) { 
        port.onMessage.addListener(function(data) {
          if (data.clip && data.clip != "")  
	     store(data.clip);
        });
});
