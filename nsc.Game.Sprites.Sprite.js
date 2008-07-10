nsc.Game.Sprites.Sprite = function(){
	
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Game.BaseObject);
	
	/////////////////////////
	// Define Public Properties/Variables/Attributes
	/////////////////////////
	
	var cycleSkip;
	var stepLength;
	var frameCounter=0;
	
	var _isMoving = false;
	this.NewProperty("IsMoving");
	this.IsMoving.Get = function()
	{
		return _isMoving
	}
	this.IsMoving.Set = function(value)
	{
		_isMoving = value;
	}
	
	this.Direction = new nsc.Game.Direction();
	
	/////////////////////////
	// Define Public Methods
	/////////////////////////
	
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
		
		if(this.IsMoving() == false)
		{
			this.IsMoving(true);
		}
	}
	
	this.StopMoving = function()
	{
		if (this.IsMoving() == true)
		{
			this.IsMoving(false);
		}
	}
	
	this.Pacer = function(oMsg)
	{
		if (this.IsMoving())
		{
			frameCounter++;
			if (frameCounter % (cycleSkip + 1) == 0)
			{
				this.MoveTo(this.Direction, stepLength);
			}
		}
	}
	
	this.Init = function()
	{
		// attach self to pace controller
		nsc.Game.PaceController.Attach(this);
	}
	
	this.Init();

}