///##########################
/// Javascript Class
/// Name: nsc.Display.Manager
/// Description: 
/// 	Help rendering all display object.
///
/// Properties:
/// 	HTMLElement: A reference to the html element which used for displaying. 
/// 	Width: Readonly, get the display area width.
/// 	Height: Readonly, get the display area height.
///
/// Events:
/// 	OnRender: Will be fired when DISPLAY_RENDER message is caught.
///
/// Public Methods:
/// 	InsertObject(obj)
///##########################

nsc.Display.Manager = function(oHTMLElement)
{
	nsc.OOP.Class(this);
	
	// Define properties and variables
	
	// Inner Cycle for rendering display 
	var _renderingCycle;
	
	var _displayObjects = new Array();
	
	var _htmlElement;
	this.NewProperty("HTMLElement");
	this.HTMLElement.Get = function()
	{
		return _htmlElement;
	}
	this.HTMLElement.Set = function(value)
	{
		if (typeof value == "string")
		{
			_htmlElement = document.getElementById(value);
		}
		else
		{
			_htmlElement = value;
		}
	}
	
	this.NewProperty("Width");
	this.Width.Get = function()
	{
		return this.HTMLElement().clientWidth;
	}
	
	this.NewProperty("Height");
	this.Height.Get = function()
	{
		return this.HTMLElement().clientHeight;
	}
	
	// On Render event.
	this.OnRender = new nsc.Event.EventHandler(this);
	
	// Define properties and variables End
	
	this.Looper = function(oMsg)
	{
		if (nsc.System.MessageConstants.IsMessage(
			nsc.System.MessageConstants.DISPLAY_RENDER
			))
		{
			this.OnRender.Invoke();
		}
	}
	
	// Insert a object to this display manager
	this.InsertObject = function(obj)
	{
		if (!obj.InstanceOf(nsc.Display.BaseObject))
		{
			throw nsc.System.Exception("obj is not a instance of nsc.Display.BaseObject!");
		}
		
		if (
			obj != null &&
			obj.innerHTML != null &&
			typeof obj.innerHTML != "undefined"
			)
		{		
			this.HTMLElement().appendChild(obj);
			// Attach the display base object to on render event
			this.OnRender.Attach(obj.Render);
		}
	}
	
	
	// Initialize variables and properties.
	this.Init = function()
	{
	
		_renderingCycle = new nsc.Cycling.Cycle();
		_renderingCycle.SetWorkerProcess(this.Looper);
		_renderingCycle.Start();
	
		// Set HTMLElement property
		// if oHTMLElement is a string, consider it as element id and get the reference.
		// otherwise assign the element reference directly
		if (oHTMLElement != null)
		{
			this.HTMLElement(oHTMLElement);
		}
	};
	
	this.Init();
	
}
// TO DO
nsc.Display.Manager.Create = function(elmtParent, elmtID)
{
	
}