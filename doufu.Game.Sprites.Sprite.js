doufu.Game.Sprites.Sprite = function(){
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Game.BaseObject);
	
	/////////////////////////
	// Define Public Properties/Variables/Attributes
	/////////////////////////
	
	var cycleSkip;
	var stepLength;
	var frameCounter=0;
	
	this.IsMoving = false;
	
	this.Direction = new doufu.Game.Direction();
	
	// The polygon for collision detecting while object is moving
	this.Polygon = new doufu.Display.Drawing.Polygon();
	
	// The polygon for collsion detecting while object being attacked.
	this.InRangePolygon = new doufu.Display.Drawing.Polygon();
	
	// OnConfirmMovable event
	this.OnConfirmMovable = new doufu.Event.EventHandler(this);
	
	/////////////////////////
	// Define Public Methods
	/////////////////////////
	
	// Move sprite with specified direction point with specified speed.
	this.MoveTo = function(oDirection, iLength)
	{
		if (eval(doufu.System.APIs.GetIsNullMacro("oDirection")))
		{
			throw doufu.System.Exception("oDirection should not be null!");
		}
		if (!oDirection.InstanceOf(doufu.Game.Direction))
		{
			throw doufu.System.Exception("oDirection should be a instance of doufu.Game.Direction!");
		}
		
		var lastConfirmResult = false;
		var cubeNextStep = new doufu.Display.Drawing.Cube();
		
		cubeNextStep.X = this.X + oDirection.X() * iLength;
		cubeNextStep.Y = this.Y + oDirection.Y() * iLength;
		cubeNextStep.Z = this.Z + oDirection.Z() * iLength;
		
		// Collision detecting and others...
		lastConfirmResult = this.OnConfirmMovable.Invoke({Cube: cubeNextStep, Polygon:this.Polygon});
		
		// TODO: Release the cube
		// Should not move.
		if (lastConfirmResult == false)
		{
			return;
		}
		
		
		// Caculating the next position
		this.X = cubeNextStep.X;
		this.Y = cubeNextStep.Y;
		this.Z = cubeNextStep.Z;
	}
	
	this.StartMoving =function(oDirection, iSpeed)
	{
		this.Direction = oDirection;
		
		var temSpeed = doufu.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed);
		cycleSkip = temSpeed.CycleSkip;
		stepLength = temSpeed.StepLength;
		
		if(this.IsMoving == false)
		{
			this.IsMoving = true;
		}
	}
	
	this.StopMoving = function()
	{
		if (this.IsMoving == true)
		{
			this.IsMoving = false;
		}
	}
	
	var _base_Pacer = this.OverrideMethod("Pacer", function(oMsg)
	{
		if (this.IsMoving)
		{
			frameCounter++;
			if (frameCounter % (cycleSkip + 1) == 0)
			{
				this.MoveTo(this.Direction, stepLength);
			}
		}
		
		_base_Pacer(oMsg);
	});
	
}