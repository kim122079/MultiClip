function save_options()
{
	var clipSize = $('clipboard_size').value;

	if (clipSize)
	{
		localStorage["clipboard_size"] = clipSize;
	}
	showStatusMsg("Options saved!");
}

function restore_options()
{
	$('clipboard_size').value = localStorage["clipboard_size"] || '5' ;

}
