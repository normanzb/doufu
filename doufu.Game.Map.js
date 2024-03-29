/*
	Class: doufu.Game.Map
	
	Game map class, containning the camera information and map shape.
	
	Constructor:
		oPlayGround - Specified a playground object, new map will bind to the specified playground.
*/
doufu.Game.Map = function(oPlayGround)
{
	doufu.OOP.Class(this);

	// privated and pre-initialized variable helps to speed up collision caculation.
	var tmpPolygon1 = new doufu.Display.Drawing.Polygon();
	var tmpPolygon2 = new doufu.Display.Drawing.Polygon();
	var tmpRectangle1 = new doufu.Display.Drawing.Rectangle();
	var tmpRectangle2 = new doufu.Display.Drawing.Rectangle();
	var tmpCube = new doufu.Display.Drawing.Cube();
	var tmpVector1 = new doufu.Display.Drawing.Vector();
	var tmpVector2 = new doufu.Display.Drawing.Vector();
	
	/*
		Property: LinkedPlayGround
		
		Indicate the linked playground object.
	*/
	this.LinkedPlayGround;
	
	/*
		Property: ImagePath
		
		Indicate the background image of current map.
		If the map is not tiled, map will using the image as background.
	*/
	this.ImagePath;
	
	/*
		Property: BackgroundImagePath
		
		<doufu.Property>
		Get or set the background image path of current map.
	*/
	this.NewProperty("BackgroundImagePath");
	this.BackgroundImagePath.Get = function()
	{
		return this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundImage;
	}
	this.BackgroundImagePath.Set = function(value)
	{
		this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundPosition = "0px 0px";
		this.BackgroundRepeat(false);
		this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundImage = "url(\"" + value + "\")";
	}
	
	/*
		Property: BackgroundImagePath
		
		<doufu.Property>
		Indicate whether background is a pattern
	*/
	this.NewProperty("BackgroundRepeat");
	this.BackgroundRepeat.Get = function()
	{
		return  _backgroundRepeat = false;
	}
	this.BackgroundRepeat.Set = function(value)
	{
		if (value == true)
		{
			this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundRepeat = "repeat";
		}
		else
		{
			this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundRepeat = "no-repeat";
		}
		_backgroundRepeat = value;
	}
	
	/*
		Property: Width
		
		Indicate the width of current map.
	*/
	this.Width;
	
	/*
		Property: Height
		
		Indicate the height of current map.
	*/
	this.Height;
	
	/*
		Property: Shapes
		
		Can be a polygon collection that present the edge of current map.
	*/
	this.Shapes = new doufu.CustomTypes.Collection(doufu.Display.Drawing.Polygon);
	
	/*
		Property: UsePointCollision
		
		True to use point rather than the entire rectangle of sprite to do collision detect with edges of map.
	*/
	this.UsePointCollision = true;
	
	/*
		Property: Camera
		
		<doufu.Property> Get the camera object of current map.
	*/
	var _camera = new doufu.Game.PlayGround.Camera();
	this.NewProperty("Camera");
	this.Camera.Get = function()
	{
		return _camera;
	}
	
	/*
		Property: InitSprites
		
		Containing the sprites which will be display after map initialized
	*/
	this.InitSprites = new doufu.CustomTypes.Collection(doufu.Game.Sprites.Sprite);
	
	/*
		Callback: ConfirmMovable
		
		A confirmMovable callback which will be attached to GameObject.OnConfirmMovable event.
		
		Parameters:
			sender - One who fired this event.
			obj - Should be the game object which inserted into the playground.
		
		Return:
			Return true if movement is allowed.
	*/
	this.ConfirmMovable = function(obj)
	{
		// if the obj is playground, we don't have to do collision test.
		if (obj.Shape == this.Shape)
		{
			return true;
		}
		
		var tmpColideDrawable1,tmpColideDrawable2;
		
		// caculate the actual obj coodinates in the map
		if (obj.Shape.InstanceOf(doufu.Display.Drawing.Rectangle))
		{
			tmpRectangle1.DeepCopy(obj.Shape);
			
			tmpRectangle1.X += obj.Cube.X;
			tmpRectangle1.Y += obj.Cube.Y;
			
			tmpColideDrawable1 = tmpRectangle1;
		}
		else if (obj.Shape.InstanceOf(doufu.Display.Drawing.Polygon))
		{
			tmpPolygon1.DeepCopy(obj.Shape);
			
			for (var j = 0; i < tmpPolygon1.Length(); i++)
			{
				tmpPolygon1.Items(j).X += obj.Cube.X;
				tmpPolygon1.Items(j).Y += obj.Cube.Y;
			}
			
			tmpColideDrawable1 = tmpPolygon1;
		}
		
		// if map has edge
		// Do map edge collision detection first
		// if obj(sprite) is collided with the map edge, break.
		if (this.Shapes.Length() > 0)
		{
			for (var k = 0; k < this.Shapes.Length(); k++)
			{
				// Convert rectangle to a point, this will speed up the caculation
				// And we don't want it to do a full collision detecton when it is just collide with
				// the edges.
				// This function can only be enabled when using rectangle for sprite collision.
				if (this.UsePointCollision == true && obj.Shape.InstanceOf(doufu.Display.Drawing.Rectangle))
				{
					var x = Math.round(tmpColideDrawable1.Width / 2) + tmpColideDrawable1.X;
					var y = Math.round(tmpColideDrawable1.Height / 2) + tmpColideDrawable1.Y;
					tmpVector1.X = x - obj.Velocity.X;
					tmpVector1.Y = y - obj.Velocity.Y;
					tmpVector2.X = obj.Velocity.X + x;
					tmpVector2.Y = obj.Velocity.Y + y;
					tmpPolygon1.Clear();
					tmpPolygon1.Add(tmpVector1);
					tmpPolygon1.Add(tmpVector2);
					
					if (doufu.Game.Helpers.IsCollided(tmpPolygon1, this.Shapes.Items(k), obj.Direction))
					{
						return false;
					}
				}
				else if (doufu.Game.Helpers.IsCollided(tmpColideDrawable1, this.Shapes.Items(k), obj.Direction))
				{
					return false;
				}
			}
		}
		for(var i = 0 ; i < this.LinkedPlayGround.GameObjects().Length(); i++)
		{
			// Only sprites has polygon
			var gameObject = this.LinkedPlayGround.GameObjects().Items(i);
			if (gameObject.InstanceOf(doufu.Game.Sprites.Sprite) &&
				gameObject.Shape != null)
			{
				if (obj.Shape != gameObject.Shape)
				{
					
					tmpCube.DeepCopy(gameObject);
					
					if (gameObject.Shape.InstanceOf(doufu.Display.Drawing.Rectangle))
					{
						
						tmpRectangle2.DeepCopy(gameObject.Shape);
						
						tmpRectangle2.X += tmpCube.X;
						tmpRectangle2.Y += tmpCube.Y;

						tmpColideDrawable2 = tmpRectangle2;
					}
					else if (gameObject.Shape.InstanceOf(doufu.Display.Drawing.Polygon))
					{
						tmpPolygon2.DeepCopy(gameObject.Shape);
						
						for (var j = 0; j < tmpPolygon2.Length(); j++)
						{
							tmpPolygon2.Items(j).X += tmpCube.X;
							tmpPolygon2.Items(j).Y += tmpCube.Y;
						}
						
						tmpColideDrawable2 = tmpPolygon2;
					}
					
					// if the two polygon is in same layer and also collided.
					if (tmpCube.Z == obj.Cube.Z && doufu.Game.Helpers.IsCollided(tmpColideDrawable1, tmpColideDrawable2))
					{
						return false;
					}
				}
			}
		}
		
		
		return true;
	};
	
	/*
		Function: Initialize
		
		Initialize the map object.
		
	*/
	this.Initialize = function()
	{
		this.LinkedPlayGround.ImagePath = this.ImagePath;
		this.LinkedPlayGround.Width = this.Width;
		this.LinkedPlayGround.Height = this.Height;
		
		// set current setting to playground object
		if (this.Camera().X != 0)
		{
			this.LinkedPlayGround.Camera().X = this.Camera().X;
		}
		if (this.Camera().Y != 0)
		{
			this.LinkedPlayGround.Camera().Y = this.Camera().Y;
		}
		if (this.Camera().Width != 0)
		{
			this.LinkedPlayGround.Camera().Width = this.Camera().Width;
		}
		if (this.Camera().Height != 0)
		{
			this.LinkedPlayGround.Camera().Height = this.Camera().Height;
		}
		this.Camera(this.LinkedPlayGround.Camera());
		
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
		this.LinkedPlayGround.CurrentMap(this);
	}
	
	this.Ctor();
}