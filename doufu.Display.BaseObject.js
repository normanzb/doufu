doufu.Display.BaseObject = function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.System.Handle.Handlable);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	var BACKGROUND_REPEAT_STYLE = "no-repeat";
	
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
	
	this.Render = new doufu.Event.CallBack(function(oSender, oMsg)
	{
		if (
			doufu.System.MessageConstants.IsMessage(oMsg,
			doufu.System.MessageConstants.DISPLAY_RENDER) &&
			doufu.System.Handle.IsMe(this, oMsg.Handle)
			)
		{
			this.HTMLElement().style.left = this.X + "px";
			this.HTMLElement().style.top = this.Y + "px";
			this.HTMLElement().style.zIndex = this.Z;
			this.HTMLElement().style.width = this.Width + "px";
			this.HTMLElement().style.height = this.Height + "px";
			this.HTMLElement().style.backgroundPosition = doufu.System.Convert.ToString(-this.ImageOffset.X) + "px " + doufu.System.Convert.ToString(-this.ImageOffset.Y) + "px";
			
			this.HTMLElement().style.backgroundRepeat = BACKGROUND_REPEAT_STYLE;
			
			// deal with background image
			var backgroundImage = "url(" + this.ImagePath + ")";
			
			if (backgroundImage != this.HTMLElement().style.backgroundImage)
			{
				this.HTMLElement().style.backgroundImage = backgroundImage;
			}
			
			// verbose log
			doufu.System.Logger.Verbose("doufu.Display.BaseObject: Message=" + oMsg.Message + "; Handle=" + oMsg.Handle);
		}
	},
	this);
	
	// Attributes
	this.ImageOffset = new doufu.Display.Drawing.Rectangle();
	this.ImagePath = new String();
	this.Z = 0;
	// Indicate whether this display object is in user's view.
	this.IsInView = false;
	
	
	// variables
	
	this.Handle = doufu.System.Handle.Generate();
	
	this.Ctor = function()
	{
		this.HTMLElement(doufu.Browser.DOM.CreateElement("div"));
		this.HTMLElement().style.position="absolute";
		
		doufu.System.Logger.Debug("doufu.Display.BaseObject::Ctor(): Initialized");
	}
	
	this.Ctor();
	
	// TO DO: 1) AnimationFrame object, the object specified the position of action frame in the static picture.
}