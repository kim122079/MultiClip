function save_options()
{
	localStorage["clipboard_size"] = document.getElementById('clipboard_size').value;
	localStorage["show_screenshot"] = document.getElementById('show_screenshot').checked;
	localStorage["show_dialog_onmouseup"] = document.getElementById('show_dialog_onmouseup').checked;
	localStorage["show_status_messages"] = document.getElementById('show_status_messages').checked;
	showStatusMsg("Options saved!");
}

function restore_options()
{
	document.getElementById('clipboard_size').value = localStorage["clipboard_size"] || '5' ;
	document.getElementById('show_screenshot').checked = localStorage["show_screenshot"] || '1' ;
	document.getElementById('show_dialog_onmouseup').checked = localStorage["show_dialog_onmouseup"] || '1' ;
	document.getElementById('show_status_messages').checked = localStorage["show_status_messages"] || '1' ;
}
