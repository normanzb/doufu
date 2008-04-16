nsc.Game.BaseObject = function(){
	
	nsc.OOP.Class(this);
	
	// Below code may unneccesary
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
	// unneccesary code end
	
	
	
	var _linkedDisplayObject = new nsc.Display.BaseObject();
	this.NewProperty("LinkedDisplayObject");
	this.LinkedDisplayObject.Get = function()
	{
		return _linkedDisplayObject;
	}
	this.LinkedDisplayObject.Set = function(value)
	{
		_linkedDisplayObject = value;
	}
	
	// Attributes
	this.X = 0;
	this.Y = 0;
	this.Width = 0;
	this.Height = 0;
	
	
	
}