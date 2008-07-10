doufu.System.Logger = new function()
{
	__DOUFU_DEBUG = typeof Logger == doufu.System.Constants.TYPE_UNDEFINED ?false:true;
		
	this.Debug = function(sMessage)
	{
		if (__DOUFU_DEBUG)
		{
			Logger.info(sMessage);
		}
	}
	
	this.Error = function(sMessage,oError)
	{
		if (__DOUFU_DEBUG)
		{
			Logger.error(sMessage,oError);
		}
	}
	
	this.Verbose = function(sMessage)
	{
		if (CONFIG_LOGGING_VERBOSE && __DOUFU_DEBUG)
		{
			Logger.debug(sMessage);
		}
	}
}