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
	
	// Define properties and variables End
	
	/////////////////////////
	// Public Methods
	/////////////////////////
	
	this.InsertObject = function(obj)
	{
		_gameObjects.Add(obj);
	}
	
	this._base_RenderRefer = this.Render.Reference;
	this.Render.Reference = function(oSender, oEvent)
	{
		// Insert in-range display object to display manager
		for (var i = 0; i < _gameObjects.Length(); i++)
		{
			// translate game object to display object.
			_gameObjects.InnerArray()[i].LinkedDisplayObject().X = _gameObjects.InnerArray()[i].X - this.Camera().X;
			// Assuming the anglog is 60 degree.
			_gameObjects.InnerArray()[i].LinkedDisplayObject().Y = _gameObjects.InnerArray()[i].Y / 2 - this.Camera().Y;
		
			if(doufu.Game.Helpers.IsCollided(_gameObjects.InnerArray()[i].LinkedDisplayObject(), this.Camera()))
			{
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
	// Constructor, Initialize variables and properties.
	/////////////////////////
	this.Init = function()
	{
		if (!oDisplayManager.InstanceOf(doufu.Display.Manager))
		{
			throw doufu.System.Exception("Must specified a display manager.");
		}
		
		doufu.System.Logger.Debug("Playground: Loopped in.");
		
		// Link display manager
		linkedDisplayMgr = oDisplayManager;
		doufu.System.Logger.Debug("Playground: create play ground temporary html element.");
		
		// Inserted play ground it self to display mananger.
		doufu.System.Logger.Debug("Playground: Insert playground to display manager");
		linkedDisplayMgr.InsertObject(this);
		
		// Playground layer has it default z index 2001;
		this.Z = 2001;
		
	};
	
	this.Init();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}