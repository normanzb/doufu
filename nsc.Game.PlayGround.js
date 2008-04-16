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
	
	var linkedDisplayMgr = null;
	
	// Define properties and variables
	
	// for saving all inserted elements
	var _elements = new nsc.CustomTypes.Collection(nsc.Game.BaseObject);
	
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
	
	
	// Insert a object to this playground
	this.InsertObject = function(obj)
	{
		_elements.Add(obj);
	}
	
	this.Render.Reference = function()
	{
		// TODO: insert all display object to display manager
		/// Remove
		alert(1);
	}
	
	
	// Initialize variables and properties.
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
		this.HTMLElement(nsc.Browser.DOM.CreateElement("div"));
		
		// Inserted play ground it self to display mananger.
		nsc.System.Logger.Debug("Playground: Insert playground to display manager");
		linkedDisplayMgr.InsertObject(this);
		
	};
	
	this.Init();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}