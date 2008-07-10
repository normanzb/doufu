doufu.Game.BaseObject = function(){
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	this.Z = 0;
	
	// Saving the image information, this.ImageOffset.X/Y stands for the offset.
	this.ImageOffset = new doufu.Display.Drawing.Rectangle();
	this.ImagePath = new String();

	var _linkedDisplayObject = new doufu.Display.BaseObject();
	this.NewProperty("LinkedDisplayObject");
	this.LinkedDisplayObject.Get = function()
	{
		return _linkedDisplayObject;
	}
	this.LinkedDisplayObject.Set = function(value)
	{
		_linkedDisplayObject = value;
	}
	
	this.Worker = function(oMsg)
	{
		
	}
	
}