doufu.System.MessageQueue = function()
{
	return doufu.System.MessageQueue._internalQueue;
}
doufu.OOP.Property(doufu.System.MessageQueue);

doufu.System.MessageQueue._internalQueue = new Array();


doufu.System.MessageQueue.Push = function(oHandlerOrMessage, sMsg, wParam, lParam)
{
	var tmpMsg;
	if (!(oHandlerOrMessage instanceof doufu.System.Message))
	{
		tmpMsg = doufu.System.Message(oHandlerOrMessage, sMsg, wParam, lParam);
	}
	else
	{
		tmpMsg = oHandlerOrMessage;
	}
	return doufu.System.MessageQueue._internalQueue.push(tmpMsg);
}

doufu.System.MessageQueue.Shift = function()
{
	return doufu.System.MessageQueue._internalQueue.shift();
}

doufu.System.MessageQueue.Length = function()
{
	return doufu.System.MessageQueue._internalQueue.length;
}