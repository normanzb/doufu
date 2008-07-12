///##########################
/// Javascript Class
/// Name: doufu.Display.Manager
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

doufu.Display.Manager = function(oHTMLElement)
{
	doufu.OOP.Class(this);
	
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
			doufu.System.Logger.Debug("doufu.Display.Manager: Set html element by id \"" + value + "\"");
			_htmlElement = document.getElementById(value);
			doufu.System.Logger.Debug("doufu.Display.Manager: Html element was set");
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
	this.OnRender = new doufu.Event.EventHandler(this);
	
	// Define properties and variables End
	
	this.Looper = function(oMsg)
	{
		if (doufu.System.MessageConstants.IsMessage(oMsg,
			doufu.System.MessageConstants.DISPLAY_RENDER
			))
		{
			doufu.System.Logger.Verbose("doufu.Display.Manager: Sending message: message=" + oMsg.Message);
			this.OnRender.Invoke(oMsg);
			doufu.System.Logger.Verbose("doufu.Display.Manager: Message was sent.");
		}
	}
	
	// Insert a object to this display manager
	this.InsertObject = function(obj)
	{
		if (!obj.InstanceOf(doufu.Display.BaseObject))
		{
			throw doufu.System.Exception("obj is not a instance of doufu.Display.BaseObject!");
		}
		
		doufu.System.Logger.Debug("doufu.Display.Manager: Insert Object - " + obj);
		
		if (
			typeof obj.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED  &&
			obj.InstanceOf(doufu.Display.BaseObject)
			)
		{	
			doufu.System.Logger.Debug("doufu.Display.Manager: Insert Object - Object is type safed.");
			
			this.HTMLElement().appendChild(obj.HTMLElement());
			
			doufu.System.Logger.Debug("doufu.Display.Manager: The render function is " + obj.Render);
			
			// Attach the display base object to on render event
			this.OnRender.Attach(obj.Render);
			// Indicate obj is in view
			obj.IsInView = true;
			
			doufu.System.Logger.Debug("doufu.Display.Manager: Insert Object - Object Inserted.");
		}
	}
	
	// Remove a object from display manager
	this.RemoveObject = function(obj)
	{
		if (!obj.InstanceOf(doufu.Display.BaseObject))
		{
			throw doufu.System.Exception("obj is not a instance of doufu.Display.BaseObject!");
		}
		
		doufu.System.Logger.Debug("doufu.Display.Manager: Remove Object - " + obj);
		
		if (
			typeof obj.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED  &&
			obj.InstanceOf(doufu.Display.BaseObject)
			)
		{	
			doufu.System.Logger.Debug("doufu.Display.Manager: Remove Object - Object is type safed.");
			
			this.HTMLElement().removeChild(obj.HTMLElement());
			
			doufu.System.Logger.Debug("doufu.Display.Manager: The render function is " + obj.Render);
			
			// Attach the display base object to on render event
			this.OnRender.Detach(obj.Render);
			
			// Indicate obj is not in view
			obj.IsInView = false;
			
			doufu.System.Logger.Debug("doufu.Display.Manager: Remove Object - Object Removed.");
		}
	}
	
	// Initialize variables and properties.
	this.Ctor = function()
	{
		_renderingCycleCallback = new doufu.Event.CallBack(this.Looper, this);
		_renderingCycle = new doufu.Cycling.Cycle();
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
	
	this.Ctor();
	
}

///##########################
/// Javascript Static Method
/// Name: doufu.Display.Manager.Create
/// Description: 
/// 	Create a instance of doufu.Display.Manager
///
/// Parameters:
/// 	[TypePrameterHere]
/// 	
///
///##########################
doufu.Display.Manager.Create = function(elmtParent, elmtID, iWidth, iHeight)
{
	var tmpDiv = doufu.Browser.Helpers.CreateOverflowHiddenDiv(elmtID, elmtParent, iWidth , iHeight);
	//tmpDiv.style.width = iWidth + "px";
	//tmpDiv.style.height = iHeight + "px";
	//tmpDiv.style.border = "1px solid #000"; //hard coded
	return new doufu.Display.Manager(tmpDiv);
}