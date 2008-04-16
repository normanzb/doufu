nsc.System.MessageConstants = new Object();
// Asking to render.
nsc.System.MessageConstants.DISPLAY_RENDER= 0x8; //00001000

///##########################
/// Javascript Static Method
/// Name: nsc.System.MessageConstants.IsMessage
/// Description: 
/// 	Determine whether specified bit is on in inputted message.
///
/// Parameters:
/// 	oMsg: The message to be determined
/// 	oConst: The message const
///
///##########################
nsc.System.MessageConstants.IsMessage = function(oMsg, oConst)
{
	return (oMsg.Message & oConst) == oConst;
}