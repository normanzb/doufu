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
			nsc.System.Logger.Debug("nsc.Display.Manager: Set html element by id \"" + value + "\"");
			_htmlElement = document.getElementById(value);
			nsc.System.Logger.Debug("nsc.Display.Manager: Html element was set");
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
		if (nsc.System.MessageConstants.IsMessage(oMsg,
			nsc.System.MessageConstants.DISPLAY_RENDER
			))
		{
			nsc.System.Logger.Debug("nsc.Display.Manager: Sending message: message=" + oMsg.Message);
			this.OnRender.Invoke(oMsg);
			nsc.System.Logger.Debug("nsc.Display.Manager: Message was sent.");
		}
	}
	
	// Insert a object to this display manager
	this.InsertObject = function(obj)
	{
		if (!obj.InstanceOf(nsc.Display.BaseObject))
		{
			throw nsc.System.Exception("obj is not a instance of nsc.Display.BaseObject!");
		}
		
		nsc.System.Logger.Debug("nsc.Display.Manager: Insert Object - " + obj);
		
		if (
			typeof obj.InstanceOf != nsc.System.Constants.TYPE_UNDEFINED  &&
			obj.InstanceOf(nsc.Display.BaseObject)
			)
		{	
			nsc.System.Logger.Debug("nsc.Display.Manager: Insert Object - Object is type safed.");
			this.HTMLElement().appendChild(obj.HTMLElement());
			nsc.System.Logger.Debug("nsc.Display.Manager: The render function is " + obj.Render);
			// Attach the display base object to on render event
			this.OnRender.Attach(obj.Render);
			nsc.System.Logger.Debug("nsc.Display.Manager: Insert Object - Object Inserted.");
		}
	}
	
	// Remove a object from display manager
	this.RemoveObject = function(obj)
	{
		if (!obj.InstanceOf(nsc.Display.BaseObject))
		{
			throw nsc.System.Exception("obj is not a instance of nsc.Display.BaseObject!");
		}
		
		nsc.System.Logger.Debug("nsc.Display.Manager: Remove Object - " + obj);
		
		if (
			typeof obj.InstanceOf != nsc.System.Constants.TYPE_UNDEFINED  &&
			obj.InstanceOf(nsc.Display.BaseObject)
			)
		{	
			nsc.System.Logger.Debug("nsc.Display.Manager: Remove Object - Object is type safed.");
			this.HTMLElement().removeChild(obj.HTMLElement());
			nsc.System.Logger.Debug("nsc.Display.Manager: The render function is " + obj.Render);
			// Attach the display base object to on render event
			this.OnRender.Detach(obj.Render);
			nsc.System.Logger.Debug("nsc.Display.Manager: Remove Object - Object Removed.");
		}
	}
	
	// Initialize variables and properties.
	this.Init = function()
	{
		_renderingCycleCallback = new nsc.Event.CallBack(this.Looper, this);
		_renderingCycle = new nsc.Cycling.Cycle();
		_renderingCycle.SetWorkerProcess(_renderingCycleCallback);
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

///##########################
/// Javascript Static Method
/// Name: nsc.Display.Manager.Create
/// Description: 
/// 	Create a instance of nsc.Display.Manager
///
/// Parameters:
/// 	[TypePrameterHere]
/// 	
///
///##########################
nsc.Display.Manager.Create = function(elmtParent, elmtID, iWidth, iHeight)
{
	var tmpDiv = nsc.Browser.Helpers.CreateOverflowHiddenDiv(elmtID, elmtParent, iWidth , iHeight);
	//tmpDiv.style.width = iWidth + "px";
	//tmpDiv.style.height = iHeight + "px";
	//tmpDiv.style.border = "1px solid #000"; //hard coded
	return new nsc.Display.Manager(tmpDiv);
}