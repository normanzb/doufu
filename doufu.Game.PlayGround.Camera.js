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
	
	var skipFrameCount = 0;
	
	var callbackOffsetCaculation = new doufu.Event.CallBack(function()
	{
		doufu.System.Logger.Verbose("doufu.Game.PlayGround.Camera::callbackOffsetCaculation(): Invoked.");
		
		if (this.IsTracing)
		{
			if (!this.SmoothTracing)
			{
				this.X = this.TracedObject.X + this.TracedObject.Width/2 - this.Width / 2;
				this.Y = doufu.Game.PlayGround.Helpers.RealYToScreenY(this.TracedObject.Y + this.TracedObject.Height/2, true) - this.Height / 2;
			}
			else if(skipFrameCount % (this.SkipFrame + 1) == 0)
			{
				
				var destX = this.TracedObject.X + this.TracedObject.Width/2 - this.Width / 2;
				var destY = doufu.Game.PlayGround.Helpers.RealYToScreenY(this.TracedObject.Y + this.TracedObject.Height/2, true) - this.Height / 2;
				
				var slipX = Math.ceil((destX - this.X) / 2);
				var slipY = Math.ceil((destY - this.Y) / 2);
				
				this.X += slipX;
				this.Y += slipY;
				
				// if locked, trigger event.
				if (slipX == 0 && slipY == 0)
				{
					this.OnLocked.Invoke();
				}
			}
			skipFrameCount++;
			if (skipFrameCount == 10000000)
			{
				skipFrameCount = 0;
			}
		}
	}, this);
	
	/*
		Event: OnLocked
		
		Fired when the tracing object is locked.
	*/
	this.OnLocked = new doufu.Event.EventHandler(this);
	
	/*
		Property: IsTracing
		
		Indicate whether this camera is tracing a character
	*/
	this.IsTracing = false;
	
	/*
		Property: SmoothTracing
		
		Enable or disable smooth tracing.
	*/
	this.SmoothTracing = false;
	
	/*
		Property: SkipFrame
		
		Indicate how many frames were skipped while using smooth tracing.
	*/
	this.SkipFrame = 0;
	
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
		if (this.IsTracing)
		{
			this.StopTrace();
		}
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
		doufu.Game.PaceController.OnPaceControlCompleted.Detach(callbackOffsetCaculation);
		
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