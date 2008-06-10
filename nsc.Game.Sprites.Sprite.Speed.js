nsc.Game.Sprites.Sprite.Speed = function(iSpeed)
{
	nsc.OOP.Class(this);
	
	this.CycleSkip;
	this.StepLength;
	
	this.Init = function()
	{
		if (typeof iSpeed != nsc.System.Constants.TYPE_UNDEFINED)
		{
			var tmpSpeed = nsc.Game.Sprites.Sprite.Speed.CaculateFromInteger(iSpeed);
			this.CycleSkip = tmpSpeed.CycleSkip;
			this.StepLength = tmpSpeed.StepLength;
			delete tmpSpeed;
		}
	}
}

nsc.Game.Sprites.Sprite.Speed.CaculateFromInteger = function(iSpeed)
{
	var oRet = new nsc.Game.Sprites.Sprite.Speed();
	
	// The minium number is 1, means every 1 frame need to do moving.
	oRet.CycleSkip = 49 - iSpeed % 50;
	// The minium number 1; means every move, the sprite goes 1 unit.
	oRet.StepLength = Math.floor(iSpeed / 50) + 1;
	
	return oRet;
}
