/*
	Class: doufu.Game.Map
	
	Game map class, containning the information camera and map sharp.
	
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
		this.LinkedPlayGround.LinkedDisplayManager().HTMLElement().style.backgroundImage = "url(\"" + value + "\")";
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
		Property: Sharps
		
		Can be a polygon collection that present the edge of current map.
	*/
	this.Sharps = new doufu.CustomTypes.Collection(doufu.Display.Drawing.Polygon);
	
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
		
	*/
	this.ConfirmMovable = new doufu.Event.CallBack(function(sender, obj)
	{

		for(var i = 0 ; i < this.LinkedPlayGround.GameObjects().Length(); i++)
		{
			// Only sprites has polygon
			if (this.LinkedPlayGround.GameObjects().Items(i).InstanceOf(doufu.Game.Sprites.Sprite) && this.LinkedPlayGround.GameObjects().Items(i).Sharp != null)
			{
				// if the obj is playground, we don't have to do collision test.
				if (obj.Sharp == this.Sharp)
				{
					return true;
				}
				
				var tmpColideDrawable1,tmpColideDrawable2;
				
				// caculate the actual obj coodinates in the map
				if (obj.Sharp.InstanceOf(doufu.Display.Drawing.Rectangle))
				{
					tmpRectangle1.DeepCopy(obj.Sharp);
					
					tmpRectangle1.X += obj.Cube.X;
					tmpRectangle1.Y += obj.Cube.Y;
					
					tmpColideDrawable1 = tmpRectangle1;
				}
				else if (obj.Sharp.InstanceOf(doufu.Display.Drawing.Polygon))
				{
					tmpPolygon1.DeepCopy(obj.Sharp);
					
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
				if (this.Sharps.Length() > 0)
				{
					for (var k = 0; k < this.Sharps.Length(); k++)
					{
					
						if (doufu.Game.Helpers.IsCollided(tmpColideDrawable1, this.Sharps.Items(k)))
						{
							return false;
						}
					}
				}
				
				if (obj.Sharp != this.LinkedPlayGround.GameObjects().Items(i).Sharp)
				{
					
					tmpCube.DeepCopy(this.LinkedPlayGround.GameObjects().Items(i));
					
					if (this.LinkedPlayGround.GameObjects().Items(i).Sharp.InstanceOf(doufu.Display.Drawing.Rectangle))
					{
						
						tmpRectangle2.DeepCopy(this.LinkedPlayGround.GameObjects().Items(i).Sharp);
						
						tmpRectangle2.X += tmpCube.X;
						tmpRectangle2.Y += tmpCube.Y;

						tmpColideDrawable2 = tmpRectangle2;
					}
					else if (this.LinkedPlayGround.GameObjects().Items(i).Sharp.InstanceOf(doufu.Display.Drawing.Polygon))
					{
						tmpPolygon2.DeepCopy(this.LinkedPlayGround.GameObjects().Items(i).Sharp);
						
						for (var j = 0; i < tmpPolygon2.Length(); i++)
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
	}, this);
	
	/*
		Callback: AddCollisionDetection
		
		Adding collision detection for every sprite in the specified playground.
		
		This callback will be called when a object is insertted to linked playground.
		Callback will attach this.ConfirmMovable (callback) to object.OnConfirmMovable event.
		So that when a GameObject.OnConfirmMovable is invoked, this.OnConfrimMovable will be called.
		
		Parameters:
			sender - One who fired this event.
			obj - Should be the game object which inserted into the playground.
		
	*/
	this.AddCollisionDetection = new doufu.Event.CallBack(function(sender, obj)
	{
		if (obj.InstanceOf(doufu.Game.Sprites.Sprite))
		{
			obj.OnConfirmMovable.Attach(this.ConfirmMovable);
		}
	}, this);
	
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
		
		this.LinkedPlayGround.OnInsertObject.Attach(this.AddCollisionDetection);
	}
	
	this.Ctor();
}