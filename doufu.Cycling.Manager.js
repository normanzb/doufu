
doufu.Cycling.Manager = new function __nsc_Cycling_Manager()
{

	this.Register = function(oCycle)
	{
		// Add to Pool
		doufu.Cycling.Pool.Add(oCycle);
	}
	
	this.Unregister = function(oCycle)
	{
		doufu.Cycling.Pool.Remove(oCycle);
	}
	
	this.Looper = function(oMsg)
	{
		if (!(oMsg instanceof doufu.System.Message))
			throw doufu.System.Exception("The message dispatched is not derived from doufu.System.Message");
		
		for (var i = 0; i < doufu.Cycling.Pool.Length; i++)
		{
			doufu.Cycling.Pool[i].Looper(oMsg);
		}
	}
}