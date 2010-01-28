var MAX_CLIPPINGS = 5;
var dataKey = "clipData";
var itemCount = 0;

const extension = chrome.extension;
      extension.onConnect.addListener(function(port) { 
        port.onMessage.addListener(function(data) {
          if (data.clip && data.clip != "")  
	     store(data.clip);
        });
});

function store(text) {
	var clipItems;	
	var clipData = getItem(dataKey);	
	if(clipData == null) {
		clipItems = new Array()		
	}
	else {
		clipItems = clipData.split("},");	
	}

	var clipItem = new Object();
	//TODO save URL which text was copied from
	clipItem.originURL = "URL: " + itemCount;
	clipItem.clippedText = text;
	
	if(clipItems.length > MAX_CLIPPINGS)	
		clipItems.pop();
	
	clipItems.unshift(JSON.stringify(clipItem));

	setItem(dataKey,clipItems);

	itemCount++;
}

function getClippings() {
	return getItem(dataKey);
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
	  	value = null;
	}
	console.log("Returning value: " + value);
	return value;
}

function flushStorage() {
	window.localStorage.clear();
}
