nsc.Game.Sprite = function(){
	
	nsc.OOP.Class(this);
	
	var _htmlContainer = null;
	this.NewProperty("HTMLContainer");
	this.HTMLContainer.Get = function()
	{
		return _htmlContainer;
	}
	this.HTMLContainer.Set = function(value)
	{
		_htmlContainer = value;
	}
	
	// TO DO: 1) AnimationFrame object, the object specified the position of action frame in the static picture.
	
}