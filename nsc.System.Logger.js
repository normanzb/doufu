nsc.System.Logger = new function()
{
	__NSC_DEBUG = typeof Logger == "undefined"?false:true;
		
	this.Debug = function(sMessage)
	{
		if (__NSC_DEBUG)
		{
			Logger.debug(sMessage);
		}
	}
	
	this.Error = function(sMessage,oError)
	{
		if (__NSC_DEBUG)
		{
			Logger.error(sMessage,oError);
		}
	}
}