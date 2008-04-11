
nsc.Cycling.Manager = new function __nsc_Cycling_Manager()
{

	this.Register = function(oCycle)
	{
		// Add to Pool
		nsc.Cycling.Pool.Add(oCycle);
	}
	
	this.Unregister = function(oCycle)
	{
		nsc.Cycling.Pool.Remove(oCycle);
	}
	
	this.Looper = function(oMsg)
	{
		if (!(oMsg instanceof nsc.System.Message))
			throw nsc.System.Exception("The message dispatched is not derived from nsc.System.Message");
		
		for (var i = 0; i < nsc.Cycling.Pool.Length; i++)
		{
			nsc.Cycling.Pool[i].Looper(oMsg);
		}
	}
}