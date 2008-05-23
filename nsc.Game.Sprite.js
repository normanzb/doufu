nsc.Game.Sprite = function(){
	
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Game.BaseObject);
	
	// Move sprite with specified direction point with specified speed.
	this.Move = function(oDirection, iSpeed)
	{
		if (eval(nsc.System.APIs.GetIsNullMacro("oDirection")))
		{
		}
	}
	
}