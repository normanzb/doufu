doufu.Cycling.Pool = new Array();

doufu.Cycling.Pool.Length = function()
{
	return doufu.Cycling.Pool.length;
}
doufu.Cycling.Pool.Length.getValue = doufu.Cycling.Pool.Length.toString = doufu.Cycling.Pool.Length;


doufu.Cycling.Pool.Add = function(oCycle)
{
	if (!(oCycle instanceof doufu.Cycling.Cycle))
			throw doufu.System.Exception("Must pass in a Cycle.");
	
	var bFound = false;
	
	// Found the index of the specified Cycle
	for (var i = 0; i< doufu.Cycling.Pool.length; i++)
	{
		if (doufu.Cycling.Pool[i] == oCycle)
		{
			bFound = true;
			break;
		}
	}
	
	// if the Cycle not in innerCycleList, add it
	if (!bFound)
	{
		var iCycle = doufu.Cycling.Pool.push(oCycle);
		iCycle--;
		this[iCycle] = doufu.Cycling.Pool[iCycle];
	}
}

doufu.Cycling.Pool.Remove = function(oCycle)
{
	var i;
	
	// Found the index of the specified Cycle
	for (i = 0; i< doufu.Cycling.Pool.length; i++)
	{
		if (doufu.Cycling.Pool[i] == oCycle)
		{
			break;
		}
	}
	
	// Remove the specified Cycle
	doufu.Cycling.Pool.splice(i,1);

}