doufu.Game.Map = function(oPlayGround)
{
	doufu.OOP.Class(this);
	
	this.LinkedPlayGround;
	
	this.ImagePath;
	this.Width;
	this.Height;
	
	this.InitSprites = new function()
	{
		$c(this);
		this.Inherit(doufu.DesignPattern.Attachable, [doufu.Game.BaseObject]);
	}
	
	var _camera = new doufu.Game.PlayGround.Camera();
	this.NewProperty("Camera");
	this.Camera.Get = function()
	{
		return _camera;
	}
	this.Camera.Set = function(value)
	{
		_camera = value;
	}
	
	this.Initialize = function()
	{
		this.LinkedPlayGround.ImagePath = this.ImagePath;
		this.LinkedPlayGround.Width = this.Width;
		this.LinkedPlayGround.Height = this.Height;
		this.LinkedPlayGround.Camera().X = this.Camera().X;
		this.LinkedPlayGround.Camera().Y = this.Camera().Y;
		this.LinkedPlayGround.Camera().Width = this.Camera().Width;
		this.LinkedPlayGround.Camera().Height = this.Camera().Height;
		
		for (var i = 0; i < this.InitSprites.InnerCollection().Length(); i++)
		{
			this.LinkedPlayGround.InsertObject(this.InitSprites.InnerCollection().Items(i));
		}
	}
	
	this.Ctor = function()
	{
		if (oPlayGround == null || !oPlayGround.InstanceOf(doufu.Game.PlayGround))
		{
			throw doufu.System.Exception("doufu.Game.Map::Ctor(): oPlayGround must be an instance of doufu.Game.PlayGround.");
		}
		
		this.LinkedPlayGround = oPlayGround;
	}
	
	this.Ctor();
}