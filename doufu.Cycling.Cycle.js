/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>doufu.Cycling.js</Dependency>
/// 	</Dependencies>
/// </PseudoCompileInfo>

///##########################
/// Javascript Class
/// Name: Cycle
/// Description: A Cycle is a helper to execute a piece of code repeatly.
/// Constructor:
///		pCallback: 	the a pointer to worker function,
///			   	 	this worker will be executed in the main loop.
///##########################

doufu.Cycling.Cycle = function(pCallback)
{
	// The Cycle Handle
	this.Handle = doufu.System.Handle.Generate();
	
	// Indicate whether Cycle should be halted.
	this.Halted = true;
	
	this.Worker = new doufu.System.MessageProcessor();
	
	// For Suspend method use.
	// How long to suspend.
	var suspendMilliSec = 0;
	// When suspend started.
	var suspendStartTime = null;
	
	this.Init = function()
	{
		if (pCallback != null && pCallback.InstanceOf(doufu.Event.CallBack));
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
		
		if (!(oMsg instanceof doufu.System.Message))
			throw doufu.System.Exception("The message dispatched is not derived from doufu.System.Message");
		
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
		doufu.Cycling.Manager.Register(this);
		this.Halted = false;
	}
	
	this.Init();
	
}