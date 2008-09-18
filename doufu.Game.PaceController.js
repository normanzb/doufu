/*
	Class: doufu.Game.PaceController
	
	A singleton which helps to control the frequency of moving, animation of all game objects.
	
*/
doufu.Game.PaceController = new function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.DesignPattern.Attachable, [doufu.Game.BaseObject]);
	
	// The shared cycle which will be used by all game objects.
	this.Cycle;
	
	/*
		Event: OnPaceControlCompleted
		
		Will be fired when all pace controll jobs in current cycle is done.
	*/
	this.OnPaceControlCompleted = new doufu.Event.EventHandler(this);
	
	this.WorkerCallback = new doufu.Event.CallBack(function(oMsg)
	{
		doufu.System.Logger.Verbose("doufu.Game.PaceController::WorkerCallback(): Start calling pacers. Length: " + this.InnerCollection().Length());
		var i;
		for(i = 0; i < this.InnerCollection().Length(); i++)
		{
			this.InnerCollection().Items(i).Pacer.call(this.InnerCollection().Items(i), oMsg);
		}
		
		// invoke on pace control complete event.
		this.OnPaceControlCompleted.Invoke();
		
		doufu.System.Logger.Verbose("doufu.Game.PaceController::WorkerCallback(): Pacer calling end.");
	}, this);
	
	this.Ctor = function()
	{
		this.Cycle = new doufu.Cycling.Cycle(this.WorkerCallback);
		this.Cycle.Start();
		
	}
	
	this.Ctor();
}