/*
	Class: doufu.Game.PlayGround.Camera
	
	The camera for playground coordinary caculation
	
	Inherit:
	<doufu.Display.Drawing.Rectangle>
	<doufu.Game.GameObject>
*/
doufu.Game.PlayGround.Camera = function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	var callbackOffsetCaculation = new doufu.Event.CallBack(function()
	{
		doufu.System.Logger.Verbose("doufu.Game.PlayGround.Camera::callbackOffsetCaculation(): Invoked.");
		
		if (this.IsTracing)
		{
			this.X = this.TracedObject.X + this.TracedObject.Width/2 - this.Width / 2;
			this.Y = doufu.Game.PlayGround.Helpers.RealYToScreenY(this.TracedObject.Y + this.TracedObject.Height/2, true) - this.Height / 2;
		}
	}, this)
	
	/*
		Property: IsTracing
		
		Indicate whether this camera is tracing a character
	*/
	this.IsTracing = false;
	
	/*
		Property: TracedObject
		
		Get the game object which be traced.
	*/
	this.TracedObject = null;
	
	/*
		Function: Trace
		
		Keep camera tracing a game object
		
		Parameters:
			gameObj - Specify a game object to be traced.
	*/
	this.Trace = function(gameObj)
	{
		doufu.System.Logger.Debug("doufu.Game.PlayGround.Camera::Trace(): Attach OnPaceControlCompleted event.");
		// Camera should follow the pace of sprites.
		doufu.Game.PaceController.OnPaceControlCompleted.Attach(callbackOffsetCaculation);
		
		this.IsTracing = true;
		this.TracedObject = gameObj;
	}
	
	/*
		Function: StopTrace
		
		Stop tracing game object.
	*/
	this.StopTrace = function()
	{
		doufu.Game.PaceController.Detach(callbackOffsetCaculation);
		
		this.IsTracing = false;
		this.TracedObject = null;
	}
	
	this.Ctor = function()
	{
		// detach self becase game object will attach self automatically
		doufu.Game.PaceController.Detach(this);
	}
	
	this.Ctor();
}