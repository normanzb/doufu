/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>nsc.System.js</Dependency>
/// 	</Dependencies>
/// </PseudoCompileInfo>

nsc.System.Handle = function(iHandleID)
{
	//nsc.System.Logger.Debug("nsc.System.Handle: Creating handle id " + iHandleID);
	if (typeof iHandleID == nsc.System.Constants.TYPE_UNDEFINED  || iHandleID == null)
	{
		throw nsc.System.Exception("Inputted parameter incorrect.");
	}
	this.ID = iHandleID;
}

nsc.System.Handle.Generate = function()
{
	var TempID
	if (true)//(nsc.System.Handle._syncLock == 0)
	{
		// lock
		nsc.System.Handle._syncLock = 1;
		
		nsc.System.Logger.Debug("nsc.System.Handle.Generate: Creating handle, current LastHandleID is " + (nsc.System.Handle.LastHandleID == 0?nsc.System.Handle.START_ID:nsc.System.Handle.LastHandleID));
		TempID = (nsc.System.Handle.LastHandleID == 0?nsc.System.Handle.Constants.START_ID:nsc.System.Handle.LastHandleID) + 1;
		nsc.System.Handle.LastHandleID = TempID;
		
		// unlock
		nsc.System.Handle._syncLock == 0;
	}
	else
	{
		//alert("Block:" + nsc.System.Handle.LastHandleID + " " + nsc.System.Handle._syncLock);
		nsc.Cycling.Block(1);
		return nsc.System.Handle.Generate();
	}
	return new nsc.System.Handle(TempID);
}

nsc.System.Handle.IsMe = function(oHandleOwner, oHandler)
{
	if (typeof oHandleOwner.InstanceOf == nsc.System.Constants.TYPE_UNDEFINED ||
		!oHandleOwner.InstanceOf(nsc.System.Handle.Handlable))
	{
		throw nsc.System.Exception("oHandleOwner type incorrect!");
	}
	
	if (oHandler == nsc.System.Handle.Constants.BROADCAST)
	{
		return true;
	}
	if (oHandler == oHandleOwner.Handle)
	{
		return true;
	}
	return false;
}

nsc.System.Handle.LastHandleID = 0;

nsc.System.Handle._syncLock = 0;