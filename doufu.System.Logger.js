/*
	Namespace: doufu.System.Logger
	
	Root namespace of logger helper.
*/
doufu.System.Logger = {};

/*
	Namespace: doufu.System.Logger.Adapters
	
	Provide adapters different debug console.
*/
doufu.System.Logger.Adapters = {};

/*
	Class: doufu.System.Logger.Adapters.Adaptable
	
	All logging adapter should inherit this class.

*/
doufu.System.Logger.Adapters.Adaptable = function()
{
	doufu.OOP.Class(this);

	/*
		Property: IsAvailable
		
		<doufu.Property> 
		Return true if current logger is availabe, otherwise, return false.
	*/
	this.NewProperty("IsAvailable");
	this.IsAvailable.Get = function()
	{
		return typeof Logger == doufu.System.Constants.TYPE_UNDEFINED?false: true;
	};
	
	/*
		Function: Debug
		
		Write debug information.
		Derived adapters must override this method.
		
		Parameters:
			sMessage - The message string which needs to be display in console.
	*/
	this.Debug = function(sMessage)
	{
		Logger.info(sMessage);
	}
	
	/*
		Function: Error
		
		Write error message.
		Derived adapters must override this method.
		
		Parameters:
			sMessage - The error message string.
			oError - 
	*/
	this.Error = function(sMessage,oError)
	{
		Logger.error(sMessage,oError);
	}
	
	/*
		Function: Verbose
		
		Write verbose message.
		Derived adapters must override this method.
		
		Parameters:
			sMessage - Verbose message string.
	*/
	this.Verbose = function(sMessage)
	{
		Logger.debug(sMessage);
	}
}

/*
	Class: doufu.System.Logger.Adapters.Doufu
	
	A doufu logger adapter.
*/
doufu.System.Logger.Adapters.Doufu = function()
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.System.Logger.Adapters.Adaptable);
	
}

/*
	Class: doufu.System.Logger.Adapters.IE8Console
	
	A IE 8 console adapter.
*/
doufu.System.Logger.Adapters.IE8Console = function()
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.System.Logger.Adapters.Adaptable);
	
	// Hide the base get function.
	this.IsAvailable.Get = function()
	{
		return typeof console == doufu.System.Constants.TYPE_UNDEFINED?false: true;
	}
	
	/*
		Property: ConsoleInstance
		
		Get the ie8 console instance, if not available return null.
		
	*/
	this.NewProperty("ConsoleInstance");
	this.ConsoleInstance.Get = function()
	{
		if (this.IsAvailable())
		{
			return console;
		}
		else
			return null;
	}
	
	this.OverrideMethod("Debug", function(sMessage)
	{
		this.ConsoleInstance().info(sMessage);
	});
	
	this.OverrideMethod("Error", function(sMessage, oError)
	{
		this.ConsoleInstance().error(sMessage, oError);
	});
	
	this.OverrideMethod("Verbose", function(sMessage)
	{
		this.ConsoleInstance().log(sMessage);
	});	
}

/*
	Class: doufu.System.Logger
	
	A singleton logging helper, helpers automatically select available console, and display debug information in it.
	If debug is enabled but there is no browser integrated console available, helper will use a web console instead.
	How to use:
		Press alt + shift + ` to open the web console interface.
		Set CONFIG_LOGGING_VERBOSE to true to enable verbose logging.
	
	Note: This helper won't work for release version.
*/
doufu.System.Logger = new function()
{
	doufu.OOP.Class(this);
	
	var doufuLogger = new doufu.System.Logger.Adapters.Doufu();
	var ie8Logger = new doufu.System.Logger.Adapters.IE8Console();
	var selectedLogger = doufuLogger;
	
	// Only debug build will have doufu logger, so if the doufu logger is availabe,
	// We consider it is running in debug mode.
	__DOUFU_DEBUG = doufuLogger.IsAvailable();
	
	if (__DOUFU_DEBUG && ie8Logger.IsAvailable())
	{
		selectedLogger = ie8Logger;
	}
	
	/*
		Property: IsDebug
		
		<doufu.Property>
		Return true if in debug mode.
	*/
	this.NewProperty("IsDebug");
	this.IsDebug.Get = function()
	{
		return __DOUFU_DEBUG;
	}
	
	/*
		Function: Debug
		
		Write debug information.
		
		Parameters:
			sMessage - The message string which needs to be display in console.
	*/
	this.Debug = function(sMessage)
	{
		if (__DOUFU_DEBUG)
		{
			selectedLogger.Debug(sMessage);
		}
	}
	
	/*
		Function: Error
		
		Write error message.
		
		Parameters:
			sMessage - The error message string.
			oError - 
	*/
	this.Error = function(sMessage,oError)
	{
		if (__DOUFU_DEBUG)
		{
			selectedLogger.Error(sMessage,oError);
		}
	}
	
	/*
		Function: Verbose
		
		Write verbose message.
		When there are large information which need to be display frequently, use verbose logging will be more approprately.
		Devs can enable it or disable verbose logging in runtime by setting CONFIG_LOGGING_VERBOSE = true or false.
		
		Parameters:
			sMessage - Verbose message string.
	*/
	this.Verbose = function(sMessage)
	{
		if (CONFIG_LOGGING_VERBOSE && __DOUFU_DEBUG)
		{
			selectedLogger.Verbose(sMessage);
		}
	}
}