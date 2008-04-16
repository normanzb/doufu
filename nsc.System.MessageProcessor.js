nsc.System.MessageProcessor = function()
{
	this.BeforeProcess = function(oMsg)
	{
		if (!(oMsg instanceof nsc.System.Message))
			throw nsc.System.Exception("The message dispatched is not derived from nsc.System.Message");
		
		this.Process.Reference.call(
			this.Process.Context,
			oMsg
			);
	}
	
	this.Process = new nsc.Event.CallBack();
}