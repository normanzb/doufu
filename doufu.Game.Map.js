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

		for(var i = 0 ; i < this.LinkedPlayGround.GameObjects().Length(); i++)
		{
			// Only sprites has polygon
			if (this.LinkedPlayGround.GameObjects().Items(i).InstanceOf(doufu.Game.Sprites.Sprite))
			{
				if (obj.Polygon != this.LinkedPlayGround.GameObjects().Items(i).Polygon)
				{
					var tmpPolygon1 = new doufu.Display.Drawing.Polygon(obj.Polygon);
					var tmpPolygon2 = new doufu.Display.Drawing.Polygon(this.LinkedPlayGround.GameObjects().Items(i).Polygon);
					var tmpCube = new doufu.Display.Drawing.Cube(this.LinkedPlayGround.GameObjects().Items(i));
					
					// caculate the actual polygon coodinates in the map
					for (var i = 0; i < tmpPolygon1.Length(); i++)
					{
						tmpPolygon1.Items(i).X += obj.Cube.X;
						tmpPolygon1.Items(i).Y += obj.Cube.Y;
					}
					
					for (var i = 0; i < tmpPolygon2.Length(); i++)
					{
						tmpPolygon2.Items(i).X += tmpCube.X;
						tmpPolygon2.Items(i).Y += tmpCube.Y;
					}
					
					// if the two polygon is in same layer and also collided.
					if (tmpCube.Z == obj.Cube.Z && doufu.Game.Helpers.IsCollided(tmpPolygon1, tmpPolygon2))
					{
						return false;
					}
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
		}
	}, this);
	
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