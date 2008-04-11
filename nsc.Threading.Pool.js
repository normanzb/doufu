nsc.Cycling.Pool = new Array();

nsc.Cycling.Pool.Length = function()
{
	return nsc.Cycling.Pool.length;
}
nsc.Cycling.Pool.Length.getValue = nsc.Cycling.Pool.Length.toString = nsc.Cycling.Pool.Length;


nsc.Cycling.Pool.Add = function(oCycle)
{
	if (!(oCycle instanceof nsc.Cycling.Cycle))
			throw nsc.System.Exception("Must pass in a Cycle.");
	
	var bFound = false;
	
	// Found the index of the specified Cycle
	for (var i = 0; i< nsc.Cycling.Pool.length; i++)
	{
		if (nsc.Cycling.Pool[i] == oCycle)
		{
			bFound = true;
			break;
		}
	}
	
	// if the Cycle not in innerCycleList, add it
	if (!bFound)
	{
		var iCycle = nsc.Cycling.Pool.push(oCycle);
		iCycle--;
		this[iCycle] = nsc.Cycling.Pool[iCycle];
	}
}

nsc.Cycling.Pool.Remove = function(oCycle)
{
	var i;
	
	// Found the index of the specified Cycle
	for (i = 0; i< nsc.Cycling.Pool.length; i++)
	{
		if (nsc.Cycling.Pool[i] == oCycle)
		{
			break;
		}
	}
	
	// Remove the specified Cycle
	nsc.Cycling.Pool.splice(i,1);

}