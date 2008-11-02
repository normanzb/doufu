doufu.Game.Sprites.Sprite.Speed = function(iSpeed)
{
	doufu.OOP.Class(this);
	
	this.CycleSkip;
	this.StepLength;
	
	this.Ctor = function()
	{
		if (typeof iSpeed != doufu.System.Constants.TYPE_UNDEFINED && iSpeed != null)
		{
			var tmpSpeed = doufu.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed);
			this.CycleSkip = tmpSpeed.CycleSkip;
			this.StepLength = tmpSpeed.StepLength;
			delete tmpSpeed;
		}
	}
	
	this.Ctor();
}

doufu.Game.Sprites.Sprite.Speed.CaculateFromInteger = function(iSpeed, outSpeed)
{
	var oRet;
	
	if (outSpeed == null)
	{
		oRet = new doufu.Game.Sprites.Sprite.Speed();
	}
	else
	{
		oRet = outSpeed;
	}
	
	// The minium number is 1, means every 1 frame need to do moving.
	oRet.CycleSkip = 49 - iSpeed % 50;
	// The minium number 1; means every move, the sprite goes 1 unit.
	oRet.StepLength = Math.floor(iSpeed / 50) + 1;
	
	return oRet;
}
