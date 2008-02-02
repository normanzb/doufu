nsc.System.MessageConstants = new Object();
// Asking to render.
nsc.System.MessageConstants.DISPLAY_RENDER=0x00001000;

nsc.System.MessageConstants.IsMessage = function(oMsg, oConst)
{
	return (oMsg.Message & oConst) == oConst;
}