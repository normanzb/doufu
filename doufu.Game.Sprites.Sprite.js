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
	var isMovingDest = false;
	
	// speed buffer
	var tmpSpeed = new doufu.Game.Sprites.Sprite.Speed();
	var tmpVector = new doufu.Display.Drawing.Vector();
	// do not assign value to this cube's property.
	var tmpClearCube = new doufu.Display.Drawing.Cube();
	var cubeNextStep = new doufu.Display.Drawing.Cube();
	var cubeDestination = new doufu.Display.Drawing.Cube();
	
	/*
		Property: IsMoving
		
		Indicate whether this sprite is moving.
	*/
	this.IsMoving = false;
	
	/*
		Property: EnableCollision
		
		Indicate whether to do collision detection while moving.
	*/
	this.EnableCollision = true;
	
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
		
		EventArgs:
			{Cube: cubeNextStep, Sharp:this.Sharp, Velocity: tmpVector, Direction: oDirection}
	*/
	this.OnConfirmMovable = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnTriggerEvent
		
		Will be fired when a single step movement was completed, trigger the event triggers which attached to this sprite.
		
		EventArgs:
			{Cube: cubeNextStep}
	*/
	this.OnTriggerEvent = new doufu.Event.EventHandler(this);
	
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
		if (this.Sharp != null && this.EnableCollision == true)
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
		
		this.OnTriggerEvent.Invoke({Cube: this, Who: this});
		
		// Caculating the next position
		this.X = cubeNextStep.X;
		this.Y = cubeNextStep.Y;
		this.Z = cubeNextStep.Z;
	}
	
	this.MoveToDest = function()
	{
		var drcDest = new doufu.Game.Direction();
		
		var x = cubeDestination.X - this.X;
		var y = cubeDestination.Y - this.Y;
		var z = cubeDestination.Z - this.Z;
		
		// absolute value
		var absX = x < 0? ~x + 1 : x;
		var absY = y < 0? ~y + 1 : y;
		var absZ = z < 0? ~z + 1 : z;
		
		// should stop moving
		if (absX < stepLength && absY < stepLength && z == 0)
		{
			this.StopMoving();
			return false;
		}
		
		// we don't have to move if the absolute difference value of destination and current positoin is smaller then step length
		drcDest.X(absX >= stepLength? x / absX:0);
		drcDest.Y(absY >= stepLength? y / absY:0);
		drcDest.Z(z / absZ);
		
		this.Direction = drcDest;
		
		return true;
	}
	
	/*
		Function: StartMovingToDest
		
		Move this sprite to destination
		
		Parameters:
			cubeDest - a instance of Cube class, indicating where is destination.
			iSpeed - How fast the sprite moving.
	*/
	this.StartMovingToDest = function(cubeDest, iSpeed)
	{
		cubeDestination.DeepCopy(cubeDest);
		
		// if iSpeed is not specifed, use old value
		if (iSpeed != null)
		{
			doufu.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed, tmpSpeed);
			cycleSkip = tmpSpeed.CycleSkip;
			stepLength = tmpSpeed.StepLength;
		}
		
		// get first direction
		if(this.MoveToDest())
		{
			this.IsMoving = true;
			isMovingDest = true;
			
			return true;
		}
		
		return false;
	}
	
	this.StartMoving =function(oDirection, iSpeed)
	{
		this.Direction = oDirection;
		
		doufu.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed, tmpSpeed);
		cycleSkip = tmpSpeed.CycleSkip;
		stepLength = tmpSpeed.StepLength;
		
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
		
		// stop to auto moving to dest.
		isMovingDest = false;
	}
	
	var _base_Pacer = this.OverrideMethod("Pacer", function(oMsg)
	{
		if (this.IsMoving)
		{
			frameCounter++;
			if (frameCounter % (cycleSkip + 1) == 0)
			{
				this.MoveTo(this.Direction, stepLength);
				
				// if IsMoving is enabled by StartMovingToDest function
				// reinvoke it to get latest direction and length.
				if (isMovingDest)
				{
					this.MoveToDest();
				}
			}
			

		}
		
		_base_Pacer(oMsg);
	});
	
}