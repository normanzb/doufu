// Dependency: nsc.Browser.DOM

nsc.Browser.WindowBase = function(winRef)
{
	
	nsc.OOP.Class(this);
	
	var _winRef;
	if (typeof winRef == nsc.System.Constants.TYPE_UNDEFINED || winRef == null)
	{
		_winRef = window;
	}
	else
	{
		_winRef = winRef
	}
	this.NewProperty("WinRef");
	this.WinRef.Get = function()
	{
		return _winRef;
	}
	
	this.DOM = new nsc.Browser.DOMBase(this.WinRef().document);
}

nsc.Browser.Window = new nsc.Browser.WindowBase();

nsc.Browser.GetWindowFromIFrame = function(elmtIFrame)
{
	if (typeof elmtIFrame.tagName == nsc.System.Constants.TYPE_UNDEFINED ||
		elmtIFrame.tagName.toLowerCase() != "iframe")
	{
		throw nsc.System.Exception("elmtIFrame was not a iframe reference.");
	}
	
	return new nsc.Browser.WindowBase(elmtIFrame.contentWindow);
		
}