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
          if (data.clip && msg.clip != "")  
	     setItem('clip1');
        });
});
