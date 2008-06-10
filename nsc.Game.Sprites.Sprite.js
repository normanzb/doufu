nsc.Game.Sprites.Sprite = function(){
	
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Game.BaseObject);
	
	// #Region: Public Properties/Variables/Attributes
	
	var cycleSkip;
	var stepLength;
	var frameCounter=0;
	
	this.NewProperty("IsMoving");
	this.IsMoving.Get = function()
	{
		return !this.MovingHandler.Halted;
	}
	this.IsMoving.Set = function(value)
	{
		this.MovingHandler.Halted = !value;
	}
	
	this.Direction = new nsc.Game.Direction();
	
	// #Region Public Methods
	
	// Move sprite with specified direction point with specified speed.
	this.MoveTo = function(oDirection, iLength)
	{
		if (eval(nsc.System.APIs.GetIsNullMacro("oDirection")))
		{
			throw nsc.System.Exception("oDirection should not be null!");
		}
		if (!oDirection.InstanceOf(nsc.Game.Direction))
		{
			throw nsc.System.Exception("oDirection should be a instance of nsc.Game.Direction!");
		}
		
		// Caculating the next position
		//godFather.StartMoving(new nsc.Game.Direction(16), 49)
		this.X += oDirection.X() * iLength;
		this.Y += oDirection.Y() * iLength;
		this.Z += oDirection.Z() * iLength;
	}
	
	this.StartMoving =function(oDirection, iSpeed)
	{
		this.Direction = oDirection;
		
		var temSpeed = nsc.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed);
		cycleSkip = temSpeed.CycleSkip;
		stepLength = temSpeed.StepLength;
		
		if(this.IsMoving == false)
		{
			this.MovingHandler.Start();
		}
	}
	
	this.StopMoving = function()
	{
		if (this.IsMoving() == true)
		{
			this.MovingHandler.Halted = true;
		}
	}
	
	this.MovingHandlerCallback = new nsc.Event.CallBack(function(oMsg)
	{
		frameCounter++;
		if (frameCounter % (cycleSkip + 1) == 0)
		{
			this.MoveTo(this.Direction, stepLength);
		}
	}, this);
	
	this.MovingHandler = new nsc.Cycling.Cycle(this.MovingHandlerCallback);

}