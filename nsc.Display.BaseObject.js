nsc.Display.BaseObject = function()
{
	nsc.OOP.Class(this);
	
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
	
	this.Render = new nsc.Event.CallBack;
	this.Context = this;
	this.Reference = function()
	{
		this.HTMLElement().style.left = this.X + "px";
		this.HTMLElement().style.top = this.Y + "px";
		nsc.System.Logger.Debug("TEST: DisplayObject:" + i.toString() + " is set");
	}
	
	this.X = 0;
	this.Y = 0;
	
	nsc.System.Logger.Debug("nsc.Display.BaseObject: Initialized");
}