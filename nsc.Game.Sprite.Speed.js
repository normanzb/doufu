nsc.Game.Sprite.Speed = function(iSpeed)
{
	nsc.OOP.Class(this);
	
	this.FrameSpeed;
	this.StepLength;
	
	this.Init = function()
	{
		if (typeof iSpeed != nsc.System.Constants.TYPE_UNDEFINED)
		{
			var tmpSpeed = nsc.Game.Sprite.Speed.CaculateFromInteger(iSpeed);
			this.FrameSpeed = tmpSpeed.FrameSpeed;
			this.StepLength = tmpSpeed.StepLength;
			delete tmpSpeed;
		}
	}
}

nsc.Game.Sprite.Speed.CaculateFromInteger = function(iSpeed)
{
	var oRet = new nsc.Game.Sprite.Speed();
	
	// The minium number is 1, means every 1 frame need to do moving.
	oRet.FrameSpeed = 50 - iSpeed % 50;
	// The minium number 1; means every move, the sprite goes 1 unit.
	oRet.StepLength = Math.floor(iSpeed / 50) + 1;
	
	return oRet;
}
