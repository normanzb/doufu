doufu.System.MessageProcessor = function()
{
	this.BeforeProcess = function(oMsg)
	{
		if (!(oMsg instanceof doufu.System.Message))
			throw doufu.System.Exception("The message dispatched is not derived from doufu.System.Message");
		
		this.Process.Reference.call(
			this.Process.Context,
			oMsg
			);
	}
	
	this.Process = new doufu.Event.CallBack();
}