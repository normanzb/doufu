doufu.Game.BaseObject = function(){
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Cube);
	this.Inherit(doufu.System.Handle.Handlable);
	
	/*
		Property: ImageOffset
		
		Saving the image information, this.ImageOffset.X/Y stands for the offset.
	*/
	this.ImageOffset = new doufu.Display.Drawing.Point();
	
	/*
		Property: StandingOffset
	*/
	this.StandingOffset = new doufu.Display.Drawing.Point();
	
	/*
		Property: LocationX
	*/
	this.NewProperty("LocationX");
	this.LocationX.Get = function()
	{
		return this.X + this.StandingOffset.X;
	}
	this.LocationX.Set = function(value)
	{
		this.X = value - this.StandingOffset.X;
	}
	
	/*
		Property: LocationY
	*/
	this.NewProperty("LocationY");
	this.LocationY.Get = function()
	{
		return this.Y + this.StandingOffset.Y;
	}
	this.LocationY.Set = function(value)
	{
		this.Y = value - this.StandingOffset.Y;
	}
	
	/*
		Property: FollowerOffset
		
	*/
	this.FollowerOffset = new doufu.Display.Drawing.Point();
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
		Property: IsFixed
		
		Indicate whether current game object's position is fixed (relatively to parent object).
	*/
	this.IsFixed = false;
	
	/*
		Property: IsFollower
		
		If current object is a follower and it has a parent object, then this object will follow the position of parent object
	*/
	this.IsFollower = false;
	
	/*
		Property: Children
		<doufu.Property>
		
		make game object as container, container all game objects which related to current.
		The positions of game objects which in this.Children array will be rendered to corresponding
		position in the screen if game objects' IsFixed properly is set to false.
	*/
	this.Children = new doufu.CustomTypes.Collection(doufu.Game.BaseObject);
	
	// Will be invoked by main cycle
	this.Pacer = function(oMsg)
	{
		doufu.System.Logger.Verbose("doufu.Game.BaseObject::Pacer(): Pacer Invoked.");
		this.Animation.Pacer(oMsg);
		
		// set position of followers
		for(var i = 0; i < this.Children.Length(); i ++)
		{
			var tmpObj = this.Children.Items(i);
			
			tmpObj.X = this.X + tmpObj.FollowerOffset.X;
			tmpObj.Y = this.Y + tmpObj.FollowerOffset.Y;
		}
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