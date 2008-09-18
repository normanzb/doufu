doufu.Game.BaseObject = function(){
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Cube);
	
	// Saving the image information, this.ImageOffset.X/Y stands for the offset.
	this.ImageOffset = new doufu.Display.Drawing.Point();
	this.ImagePath = new String();
	this.Animation = new doufu.Game.Animation(this);

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
	
	// Will be invoked by main cycle
	this.Pacer = function(oMsg)
	{
		doufu.System.Logger.Verbose("doufu.Game.BaseObject::Pacer(): Pacer Invoked.");
		this.Animation.Pacer(oMsg);
	}
	
	// Constructor
	this.Ctor = function()
	{
		// attach self to pace controller
		doufu.System.Logger.Debug("doufu.Game.BaseObject::Ctor(): Attach self to pace controller");
		doufu.Game.PaceController.Attach(this);
	}
	
	this.Ctor();
	
}