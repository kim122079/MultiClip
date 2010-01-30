function showStatusMsg(msg) {
	$('body').append('<div id="status" />');
	var xPos = screen.width/2 - 75 + "px";
	$("#status").css("left", xPos);		
	$('#status').empty().append(msg);
	$("#status:hidden").slideToggle("fast");
	setTimeout(function()
	{
		$("#status").slideToggle("fast");
	},1500);	
}
