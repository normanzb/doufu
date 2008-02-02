nsc.Threading.Pool = new Array();

nsc.Threading.Pool.Length = function()
{
	return nsc.Threading.Pool.length;
}
nsc.Threading.Pool.Length.getValue = nsc.Threading.Pool.Length.toString = nsc.Threading.Pool.Length;


nsc.Threading.Pool.Add = function(oThread)
{
	if (!(oThread instanceof nsc.Threading.Thread))
			throw nsc.System.Exception("Must pass in a thread.");
	
	var bFound = false;
	
	// Found the index of the specified thread
	for (var i = 0; i< nsc.Threading.Pool.length; i++)
	{
		if (nsc.Threading.Pool[i] == oThread)
		{
			bFound = true;
			break;
		}
	}
	
	// if the thread not in innerThreadList, add it
	if (!bFound)
	{
		var iThread = nsc.Threading.Pool.push(oThread);
		iThread--;
		this[iThread] = nsc.Threading.Pool[iThread];
	}
}

nsc.Threading.Pool.Remove = function(oThread)
{
	var i;
	
	// Found the index of the specified thread
	for (i = 0; i< nsc.Threading.Pool.length; i++)
	{
		if (nsc.Threading.Pool[i] == oThread)
		{
			break;
		}
	}
	
	// Remove the specified thread
	nsc.Threading.Pool.splice(i,1);

}