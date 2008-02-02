/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>nsc.Threading.js</Dependency>
/// 	</Dependencies>
/// </PseudoCompileInfo>

///##########################
/// Javascript Class
/// Name: Thread
/// Description: Psesudo thread for javascript.
/// Constructor:
///		pFunc: the a pointer to worker function,
///			   this worker will be executed in the main loop.
///##########################

nsc.Threading.Thread = function(pFunc)
{
	// The Thread Handle
	this.Handle = new nsc.System.Handle();
	
	// Indicate whether thread should be halted.
	this.Halted = true;
	
	this.Worker = new nsc.System.MessageProcessor();
	
	// For Suspend method use.
	// How long to suspend.
	var suspendMilliSec = 0;
	// When suspend started.
	var suspendStartTime = null;
	
	this.Init = function()
	{
		if (pFunc != null);
		{
			this.SetWorkerProcess(pFunc);
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
	
	this.SetWorkerProcess = function(pFunc)
	{
		this.Worker.Process = pFunc;
	}
	
	this.Suspend = function(iMillisecond)
	{
		suspendMilliSec = iMillisecond;
		suspendStartTime = (new Date()).getTime();
		this.Halted = true;
	}
	
	this.Start = function()
	{
		// register thread to manager
		nsc.Threading.Manager.Register(this);
		this.Halted = false;
	}
	
	this.Init();
	
}