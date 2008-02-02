
nsc.Threading.Manager = new function __nsc_Threading_Manager()
{

	this.Register = function(oThread)
	{
		// Add to Pool
		nsc.Threading.Pool.Add(oThread);
	}
	
	this.Unregister = function(oThread)
	{
		nsc.Threading.Pool.Remove(oThread);
	}
	
	this.Looper = function(oMsg)
	{
		if (!(oMsg instanceof nsc.System.Message))
			throw nsc.System.Exception("The message dispatched is not derived from nsc.System.Message");
		
		for (var i = 0; i < nsc.Threading.Pool.Length; i++)
		{
			nsc.Threading.Pool[i].Looper(oMsg);
		}
	}
}