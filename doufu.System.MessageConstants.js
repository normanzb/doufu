doufu.System.MessageConstants = new Object();
// Asking to render.
doufu.System.MessageConstants.DISPLAY_RENDER= 0x8; //00001000

///##########################
/// Javascript Static Method
/// Name: doufu.System.MessageConstants.IsMessage
/// Description: 
/// 	Determine whether specified bit is on in inputted message.
///
/// Parameters:
/// 	oMsg: The message to be determined
/// 	oConst: The message const
///
///##########################
doufu.System.MessageConstants.IsMessage = function(oMsg, oConst)
{
	return (oMsg.Message & oConst) == oConst;
}