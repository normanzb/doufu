doufu.Game.Map = function(oPlayGround)
{
	doufu.OOP.Class(this);
	
	this.LinkedPlayGround;
	
	this.ImagePath;
	this.Width;
	this.Height;
	
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
	
	this.ConfirmMovable = new doufu.Event.CallBack(function(sender, obj)
	{
		for(var i = 0 ; i < this.Polygons.Length(); i++)
		{
			if (obj.Polygon != this.Polygons.Items(i))
			{
				if (doufu.Game.Helpers.IsCollided(obj.Polygon, this.Polygons.Items(i)))
				{
					return false;
				}
			}
		} 
		return true;
	}, this);
	
	// adding collision detection for every sprite in the specified playground
	this.AddCollisionDetection = new doufu.Event.CallBack(function(sender, obj)
	{
		if (obj.InstanceOf(doufu.Game.Sprites.Sprite))
		{
			obj.OnConfirmMovable.Attach(this.ConfirmMovable);
			// adding obj to the sprite collection
			this.Polygons.Add(obj.Polygon);
		}
	}, this);
	
	// Containing all sprites polygons 
	this.Polygons = new doufu.CustomTypes.Collection(doufu.Display.Drawing.Polygon);
	
	// Containing the sprites which will be display after map initialized
	this.InitSprites = new doufu.CustomTypes.Collection(doufu.Game.Sprites.Sprite);
	
	this.Initialize = function()
	{
		this.LinkedPlayGround.ImagePath = this.ImagePath;
		this.LinkedPlayGround.Width = this.Width;
		this.LinkedPlayGround.Height = this.Height;
		this.LinkedPlayGround.Camera().X = this.Camera().X;
		this.LinkedPlayGround.Camera().Y = this.Camera().Y;
		this.LinkedPlayGround.Camera().Width = this.Camera().Width;
		this.LinkedPlayGround.Camera().Height = this.Camera().Height;
		
		for (var i = 0; i < this.InitSprites.Length(); i++)
		{
			this.LinkedPlayGround.InsertObject(this.InitSprites.Items(i));
		}
	}
	
	this.Ctor = function()
	{
		if (oPlayGround == null || !oPlayGround.InstanceOf(doufu.Game.PlayGround))
		{
			throw doufu.System.Exception("doufu.Game.Map::Ctor(): oPlayGround must be an instance of doufu.Game.PlayGround.");
		}
		
		this.LinkedPlayGround = oPlayGround;
		
		this.LinkedPlayGround.OnInsertObject.Attach(this.AddCollisionDetection);
	}
	
	this.Ctor();
}