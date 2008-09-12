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
	
	this.Inherit(doufu.Game.BaseObject);
	
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
		// Camera should follow the pace of sprites.
		doufu.Game.PaceController.Attach(this);
		
		this.IsTracing = true;
		this.TracedObject = gameObj;
	}
	
	/*
		Function: StopTrace
		
		Stop tracing game object.
	*/
	this.StopTrace = function()
	{
		doufu.Game.PaceController.Detach(this);
		
		this.IsTracing = false;
		this.TracedObject = null;
	}
	
	// Override the pacer
	var _base_Pacer = this.OverrideMethod("Pacer", function(oMsg)
	{
		if (this.IsTracing)
		{
			this.X = this.TracedObject.X + this.TracedObject.Width/2 - this.Width / 2;
			this.Y = doufu.Game.PlayGround.Helpers.RealYToScreenY(this.TracedObject.Y + this.TracedObject.Height/2) - this.Height / 2;
		}
		
		_base_Pacer(oMsg);
	});
	
	this.Ctor = function()
	{
		
	}
	
	this.Ctor();
}