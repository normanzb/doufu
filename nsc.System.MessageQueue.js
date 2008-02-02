nsc.System.MessageQueue = function()
{
	return nsc.System.MessageQueue._internalQueue;
}
nsc.OOP.Property(nsc.System.MessageQueue);

nsc.System.MessageQueue._internalQueue = new Array();


nsc.System.MessageQueue.Push = function(oHandleOrMessage, sMsg, wParam, lParam)
{
	var tmpMsg;
	if (!(oHandleOrMessage instanceof nsc.System.Message))
	{
		tmpMsg = nsc.System.Message(oHandleOrMessage, sMsg, wParam, lParam);
	}
	else
	{
		tmpMsg = oHandleOrMessage;
	}
	return nsc.System.MessageQueue._internalQueue.push(tmpMsg);
}

nsc.System.MessageQueue.Shift = function()
{
	return nsc.System.MessageQueue._internalQueue.shift();
}

