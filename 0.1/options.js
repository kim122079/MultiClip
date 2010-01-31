var bgPage = chrome.extension.getBackgroundPage();

function save_options()
{
	bgPage.options.clipboardsize = $('#clipboard_size').val();
	bgPage.options.screenshot = $('#show_screenshot')[0].checked;	
	bgPage.options.dialogonmouseup = $('#show_dialog_onmouseup')[0].checked;	
	bgPage.options.statusmessages = $('#show_status_messages')[0].checked;		
	showStatusMsg("Options saved!");
}

function restore_options()
{
	$('#clipboard_size').val(bgPage.options.clipboardsize);
	$('#show_screenshot')[0].checked = bgPage.options.screenshot;
	$('#show_dialog_onmouseup')[0].checked = bgPage.options.dialogonmouseup;
	$('#show_status_messages')[0].checked = bgPage.options.statusmessages;
}
