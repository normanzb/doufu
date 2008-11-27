doufu.Game.BaseObject = function(){
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Cube);
	this.Inherit(doufu.System.Handle.Handlable);
	
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
	
	/*
		Property: IsFollower
		
		Indicate whether current game object is a follower of parent game object (which is a container).
		The root game object cannot be a follower.
	*/
	this.IsFollower = false;
	
	/*
		Property: Children
		<doufu.Property>
		
		make game object as container, container all game objects which related to current.
		The positions of game objects which in this.Children array will be rendered to corresponding
		position in the screen if game objects' IsFollower properly is set to false.
	*/
	this.Children = new doufu.CustomTypes.Collection(doufu.Game.BaseObject);
	
	// Will be invoked by main cycle
	this.Pacer = function(oMsg)
	{
		doufu.System.Logger.Verbose("doufu.Game.BaseObject::Pacer(): Pacer Invoked.");
		this.Animation.Pacer(oMsg);
	}
	
	// Constructor
	this.Ctor = function()
	{
		this.Handle = doufu.System.Handle.Generate();
		// attach self to pace controller
		doufu.System.Logger.Debug("doufu.Game.BaseObject::Ctor(): Attach self to pace controller");
		doufu.Game.PaceController.Attach(this);
	}
	
	this.Ctor();
	
}