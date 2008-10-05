/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>doufu.System.js</Dependency>
/// 	</Dependencies>`
/// </PseudoCompileInfo>

doufu.System.Handler = function(iHandlerID)
{
	//doufu.System.Logger.Debug("doufu.System.Handler: Creating Handler id " + iHandlerID);
	if (typeof iHandlerID == doufu.System.Constants.TYPE_UNDEFINED  || iHandlerID == null)
	{
		throw doufu.System.Exception("Inputted parameter incorrect.");
	}
	this.ID = iHandlerID;
}

doufu.System.Handler.Generate = function()
{
	var TempID
	if (true)//(doufu.System.Handler._syncLock == 0)
	{
		// lock
		doufu.System.Handler._syncLock = 1;
		
		doufu.System.Logger.Debug("doufu.System.Handler.Generate: Creating Handler, current LastHandlerID is " + (doufu.System.Handler.LastHandlerID == 0?doufu.System.Handler.START_ID:doufu.System.Handler.LastHandlerID));
		TempID = (doufu.System.Handler.LastHandlerID == 0?doufu.System.Handler.Constants.START_ID:doufu.System.Handler.LastHandlerID) + 1;
		doufu.System.Handler.LastHandlerID = TempID;
		
		// unlock
		doufu.System.Handler._syncLock == 0;
	}
	else
	{
		//alert("Block:" + doufu.System.Handler.LastHandlerID + " " + doufu.System.Handler._syncLock);
		doufu.Cycling.Block(1);
		return doufu.System.Handler.Generate();
	}
	return new doufu.System.Handler(TempID);
}

doufu.System.Handler.IsMe = function(oHandlerOwner, oHandler)
{
	if (typeof oHandlerOwner.InstanceOf == doufu.System.Constants.TYPE_UNDEFINED ||
		!oHandlerOwner.InstanceOf(doufu.System.Handler.Handlable))
	{
		throw doufu.System.Exception("oHandlerOwner type incorrect!");
	}
	
	if (oHandler == doufu.System.Handler.Constants.BROADCAST)
	{
		return true;
	}
	if (oHandler == oHandlerOwner.Handler)
	{
		return true;
	}
	return false;
}

doufu.System.Handler.LastHandlerID = 0;

doufu.System.Handler._syncLock = 0;