nsc.Game.Sprites.FourDirectionSprite = function()
{
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Game.Sprites.Sprite);
	
	this.aa=1;
	
	this.OverrideMethod("StartMoving", function(oDirection, iSpeed)
	{
		if (oDirection.X() == -1)
		{
			// Face up
			
		}
		else if (oDirection.X() == 1)
		{
			// face down
			
		}

		this._base_StartMoving(oDirection, iSpeed);
	});
}