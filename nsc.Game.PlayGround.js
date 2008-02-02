nsc.Game.PlayGround = function(oDisplayManager)
{
	
	nsc.OOP.Class(this);
	
	var linkedDisplayMgr = null;
	var playGroundDisplay = null;
	
	// Define properties and variables
	var _elements = new nsc.CustomTypes.Collection();
	
	// Define properties and variables End
	
	
	// Insert a object to this playground
	this.InsertObject = function(obj)
	{
		_elements.Add(obj);
	}
	
	
	
	// Initialize variables and properties.
	this.Init = function()
	{
		if (!oDisplayManager.InstanceOf(nsc.Display.Manager))
		{
			throw nsc.System.Exception("Must specified a display manager.");
		}
		
		linkedDisplayMgr = oDisplayManager;
		playGroundDisplay = new nsc.Display.BaseObject();
		playGroundDisplay.HTMLElement(linkedDisplayMgr.HTMLElement());
	};
	
	this.Init();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}