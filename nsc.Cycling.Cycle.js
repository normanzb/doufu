/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>nsc.Cycling.js</Dependency>
/// 	</Dependencies>
/// </PseudoCompileInfo>

///##########################
/// Javascript Class
/// Name: Cycle
/// Description: Psesudo Cycle for javascript.
/// Constructor:
///		pCallback: 	the a pointer to worker function,
///			   	 	this worker will be executed in the main loop.
///##########################

nsc.Cycling.Cycle = function(pCallback)
{
	// The Cycle Handle
	this.Handle = new nsc.System.Handle();
	
	// Indicate whether Cycle should be halted.
	this.Halted = true;
	
	this.Worker = new nsc.System.MessageProcessor();
	
	// For Suspend method use.
	// How long to suspend.
	var suspendMilliSec = 0;
	// When suspend started.
	var suspendStartTime = null;
	
	this.Init = function()
	{
		if (pCallback != null);
		{
			this.SetWorkerProcess(pCallback);
		}
	}
	
	this.Looper = function(oMsg)
	{
		// Caculate suspend time
		if (suspendMilliSec < (new Date().getTime() - suspendStartTime)){
			this.Halted = false;
			suspendMilliSec = 0;
			suspendStartTime = 0;
		}

		// Don't loop if halted is true
		if (this.Halted == true)
			return;
		
		if (!(oMsg instanceof nsc.System.Message))
			throw nsc.System.Exception("The message dispatched is not derived from nsc.System.Message");
		
		this.Worker.BeforeProcess(oMsg);
	}
	
	this.SetWorkerProcess = function(pCallback)
	{
		this.Worker.Process = pCallback;
	}
	
	this.Suspend = function(iMillisecond)
	{
		suspendMilliSec = iMillisecond;
		suspendStartTime = (new Date()).getTime();
		this.Halted = true;
	}
	
	this.Start = function()
	{
		// register Cycle to manager
		nsc.Cycling.Manager.Register(this);
		this.Halted = false;
	}
	
	this.Init();
	
}