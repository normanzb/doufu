///##########################
/// Javascript Class
/// Name: doufu.Game.PlayGround
/// Description: 
/// 	Playground itself is also a display object
///
/// Attributes:
/// 	
/// 	
///
///##########################

doufu.Game.PlayGround = function(oDisplayManager)
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.BaseObject);
	
	/////////////////////////
	// Define properties and variables
	/////////////////////////
	
	var linkedDisplayMgr = null;
	
	// for saving all inserted elements
	var _gameObjects = new doufu.CustomTypes.Collection(doufu.Game.BaseObject);
	this.NewProperty("GameObjects");
	this.GameObjects.Get = function()
	{
		return _gameObjects;
	}
	this.GameObjects.Set = function(value)
	{
		_gameObjects = value;
	}
	
	// Javascript property Camera
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
	
	this.OnInsertObject = new doufu.Event.EventHandler(this);
	
	// Define properties and variables End
	
	/////////////////////////
	// Public Methods
	/////////////////////////
	
	this.InsertObject = function(obj)
	{
		this.OnInsertObject.Invoke(obj);
		_gameObjects.Add(obj);
	}
	
	this.RemoveObject = function(obj)
	{
		linkedDisplayMgr.RemoveObject(obj.LinkedDisplayObject());
		_gameObjects.Remove(obj);
	}
	
	this._base_RenderRefer = this.Render.Reference;
	this.Render.Reference = function(oSender, oEvent)
	{
		// Caculate which part of the background should be displayed according to camera coordinate
		this.ImageOffset.X = this.Camera().X;
		this.ImageOffset.Y = this.Camera().Y;
		
		// Insert in-range display object to display manager
		for (var i = 0; i < _gameObjects.Length(); i++)
		{
			
			// this is the player rectangle which on the screen surface (caculated by the analog);
			var displayBufferOffset = new doufu.Display.Drawing.Rectangle();
			displayBufferOffset.Width = _gameObjects.InnerArray()[i].Width;
			displayBufferOffset.Height = _gameObjects.InnerArray()[i].Height;
			displayBufferOffset.X = _gameObjects.InnerArray()[i].X;
			displayBufferOffset.Y = Math.floor(_gameObjects.InnerArray()[i].Y / 1.5);
			
			if(doufu.Game.Helpers.IsCollided(displayBufferOffset, this.Camera()))
			{
				// translate game object to display object.
				_gameObjects.InnerArray()[i].LinkedDisplayObject().X = displayBufferOffset.X - this.Camera().X;
				// Assuming the anglog is 60 degree.
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Y = displayBufferOffset.Y - this.Camera().Y;
				
				// The actual z value in the screen depend on the y coordinate. the game object is start from 4000 layer
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Z = (_gameObjects.InnerArray()[i].Z + 1) * 4000 + _gameObjects.InnerArray()[i].LinkedDisplayObject().Y;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Width = _gameObjects.InnerArray()[i].Width;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Height = _gameObjects.InnerArray()[i].Height;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().ImageOffset = _gameObjects.InnerArray()[i].ImageOffset;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().ImagePath = _gameObjects.InnerArray()[i].ImagePath;

				if (_gameObjects.InnerArray()[i].LinkedDisplayObject().IsInView == false)
				{
					linkedDisplayMgr.InsertObject(_gameObjects.InnerArray()[i].LinkedDisplayObject());
				}
			}
			else
			{
				// linkeedDisplayMgr removeObject
				if (_gameObjects.InnerArray()[i].LinkedDisplayObject().IsInView == true)
				{
					linkedDisplayMgr.RemoveObject(_gameObjects.InnerArray()[i].LinkedDisplayObject());
				}
				
			}
		}
		
		this._base_RenderRefer(oSender, oEvent);
	}
	
	/////////////////////////
	// Constructor, Initializing variables and properties.
	/////////////////////////
	this.Ctor = function()
	{
		if (!oDisplayManager.InstanceOf(doufu.Display.Manager))
		{
			throw doufu.System.Exception("doufu.Game.PlayGround::Ctor(): Must specified a display manager.");
		}
		
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): Loopped in.");
		
		// Link display manager
		linkedDisplayMgr = oDisplayManager;
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): created play ground temporary html element.");
		
		// Inserted play ground it self to display mananger.
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): Insert playground to display manager");
		linkedDisplayMgr.InsertObject(this);
		
		// Playground layer has it default z index 2001;
		this.Z = 2001;
		
	};
	
	this.Ctor();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}