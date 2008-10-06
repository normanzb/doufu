/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>doufu.System.js</Dependency>
/// 	</Dependencies>`
/// </PseudoCompileInfo>

doufu.System.Handle = function(iHandleID)
{
	//doufu.System.Logger.Debug("doufu.System.Handle: Creating Handle id " + iHandleID);
	if (typeof iHandleID == doufu.System.Constants.TYPE_UNDEFINED  || iHandleID == null)
	{
		throw doufu.System.Exception("Inputted parameter incorrect.");
	}
	this.ID = iHandleID;
}

doufu.System.Handle.Generate = function()
{
	var TempID
	if (true)//(doufu.System.Handle._syncLock == 0)
	{
		// lock
		doufu.System.Handle._syncLock = 1;
		
		doufu.System.Logger.Debug("doufu.System.Handle.Generate: Creating Handle, current LastHandlerID is " + (doufu.System.Handle.LastHandlerID == 0?doufu.System.Handle.START_ID:doufu.System.Handle.LastHandlerID));
		TempID = (doufu.System.Handle.LastHandlerID == 0?doufu.System.Handle.Constants.START_ID:doufu.System.Handle.LastHandlerID) + 1;
		doufu.System.Handle.LastHandlerID = TempID;
		
		// unlock
		doufu.System.Handle._syncLock == 0;
	}
	else
	{
		//alert("Block:" + doufu.System.Handle.LastHandlerID + " " + doufu.System.Handle._syncLock);
		doufu.Cycling.Block(1);
		return doufu.System.Handle.Generate();
	}
	return new doufu.System.Handle(TempID);
}

doufu.System.Handle.IsMe = function(oHandleOwner, oHandle)
{
	if (typeof oHandleOwner.InstanceOf == doufu.System.Constants.TYPE_UNDEFINED ||
		!oHandleOwner.InstanceOf(doufu.System.Handle.Handlable))
	{
		throw doufu.System.Exception("oHandleOwner type incorrect!");
	}
	
	if (oHandle == doufu.System.Handle.Constants.BROADCAST)
	{
		return true;
	}
	if (oHandle == oHandleOwner.Handle)
	{
		return true;
	}
	return false;
}

doufu.System.Handle.LastHandlerID = 0;

doufu.System.Handle._syncLock = 0;