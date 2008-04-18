nsc.Display.BaseObject = function()
{
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.System.Handle.Handlable);
	
	this.Inherit(nsc.Display.Drawing.Rectangle);
	
	// Properties
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
	
	// Public Methods
	// this.Render
	
	this.Render = new nsc.Event.CallBack(function(oSender, oMsg)
	{
		if (
			nsc.System.MessageConstants.IsMessage(oMsg,
			nsc.System.MessageConstants.DISPLAY_RENDER) &&
			nsc.System.Handle.IsMe(this, oMsg.Handle)
			)
		{
			this.HTMLElement().style.left = this.X + "px";
			this.HTMLElement().style.top = this.Y + "px";
			this.HTMLElement().style.zIndex = this.Z;
			this.HTMLElement().style.width = this.Width + "px";
			this.HTMLElement().style.height = this.Height + "px";
			this.HTMLElement().style.backgroundImage = "url(" + this.ImagePath + ")";
			nsc.System.Logger.Debug("nsc.Display.BaseObject: Message=" + oMsg.Message + "; Handle=" + oMsg.Handle);
		}
	},
	this);
	
	// Attributes
	this.ImagePath = new String();
	this.Z = 0;
	// Indicate whether this display object is in user's view.
	this.IsInView = false;
	
	
	// variables
	
	this.Handle = nsc.System.Handle.Generate();
	
	this.Init = function()
	{
		this.HTMLElement(nsc.Browser.DOM.CreateElement("div"));
		this.HTMLElement().style.position="absolute";
	}
	
	this.Init();
	
	nsc.System.Logger.Debug("nsc.Display.BaseObject: Initialized");
	
	// TO DO: 1) AnimationFrame object, the object specified the position of action frame in the static picture.
}