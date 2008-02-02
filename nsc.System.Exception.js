nsc.System.Exception = function(sMessage)
{
	var sErrMsg = arguments.caller + ":" + sMessage;
	var err = new Error(sErrMsg);
	if (!err.message)
	{
		err.message = sErrMsg;
	}
	err.name = "System Exception";
	
	nsc.System.Logger.Error(sErrMsg, err);
	
	return err;
}
