///##########################
/// Javascript Class
/// Name: nsc.Game.PlayGround
/// Description: 
/// 	
///
/// Attributes:
/// 	
/// 	
///
///##########################

nsc.Game.PlayGround = function(oDisplayManager)
{
	
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Display.BaseObject);
	
	/////////////////////////
	// Define properties and variables
	/////////////////////////
	
	var linkedDisplayMgr = null;
	
	// for saving all inserted elements
	var _gameObjects = new nsc.CustomTypes.Collection(nsc.Game.BaseObject);
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
	var _camera = new nsc.Game.PlayGround.Camera();
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
	this.Render.Reference = function()
	{
		// TODO: insert all display object to display manager
		for (var i = 0; i < _gameObjects.Length(); i++)
		{
			//_gameObjects.InnerArray()[i];
		}
		
		this._base_RenderRefer();
	}
	
	/////////////////////////
	// Constructor, Initialize variables and properties.
	/////////////////////////
	this.Init = function()
	{
		if (!oDisplayManager.InstanceOf(nsc.Display.Manager))
		{
			throw nsc.System.Exception("Must specified a display manager.");
		}
		
		nsc.System.Logger.Debug("Playground: Loopped in.");
		
		// Link display manager
		linkedDisplayMgr = oDisplayManager;
		nsc.System.Logger.Debug("Playground: create play ground temporary html element.");
		
		// Inserted play ground it self to display mananger.
		nsc.System.Logger.Debug("Playground: Insert playground to display manager");
		linkedDisplayMgr.InsertObject(this);
		
	};
	
	this.Init();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}