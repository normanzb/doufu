/*
	Class: doufu.Game.Sprites.Sprite
	
	An sprite implementation which provide basic functionalities of a game sprite
	
	See also:
		<doufu.Game.Sprites.FourDirectionSprite>
*/
doufu.Game.Sprites.Sprite = function()
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Game.BaseObject);
	
	/////////////////////////
	// Define Public Properties/Variables/Attributes
	/////////////////////////
	
	var cycleSkip;
	var stepLength;
	var frameCounter=0;
	
	var tmpVector = new doufu.Display.Drawing.Vector();
	// do not assign value to this cube's property.
	var tmpClearCube = new doufu.Display.Drawing.Cube();
	var cubeNextStep = new doufu.Display.Drawing.Cube();
	
	/*
		Property: IsMoving
		
		Indicate whether this sprite is moving.
	*/
	this.IsMoving = false;
	
	/*
		Property: Direction
		
		<doufu.Game.Direction>
		Indicate current sprite direction.
	*/
	this.Direction = new doufu.Game.Direction();
	
	/*
		Property: Sharp
		
		<doufu.Display.Drawing.Drawable>
		The sharps for collision detecting while object is moving.
		
		Allowed drawable objects:
		<doufu.Display.Drawing.Rectangle>
		<doufu.Display.Drawing.Polygon>
	*/
	this.Sharp = null;
	
	/*
		Property: InRangeSharp
		
		<doufu.Display.Drawing.Drawable>
		The sharps for collsion detecting while object being attacked.
		
		Allowed drawable objects:
		<doufu.Display.Drawing.Rectangle>
		<doufu.Display.Drawing.Polygon>
	*/
	this.InRangeSharp = new doufu.Display.Drawing.Drawable();
	
	/*
		Event: OnConfirmMovable
		
		Will be fired when character moving.
		If any of attached event callback return false, character will stop moving.
	*/
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
		// Clear the cube
		cubeNextStep.DeepCopy(tmpClearCube);
		
		cubeNextStep.X = this.X + oDirection.X() * iLength;
		cubeNextStep.Y = this.Y + oDirection.Y() * iLength;
		cubeNextStep.Z = this.Z + oDirection.Z() * iLength;
		
		// if no sharp assigned, don't need to do collsion.
		if (this.Sharp != null)
		{
			tmpVector.X = oDirection.X() * iLength;
			tmpVector.Y = oDirection.Y() * iLength;
			// Collision detecting and others...
			lastConfirmResult = this.OnConfirmMovable.Invoke({Cube: cubeNextStep, Sharp:this.Sharp, Velocity: tmpVector, Direction: oDirection});
		}
		else
		{
			lastConfirmResult = true;
		}
		
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