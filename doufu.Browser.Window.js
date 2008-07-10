// Dependency: doufu.Browser.DOM

doufu.Browser.WindowBase = function(winRef)
{
	
	doufu.OOP.Class(this);
	
	var _winRef;
	if (typeof winRef == doufu.System.Constants.TYPE_UNDEFINED || winRef == null)
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
	
	this.DOM = new doufu.Browser.DOMBase(this.WinRef().document);
}

doufu.Browser.Window = new doufu.Browser.WindowBase();

doufu.Browser.GetWindowFromIFrame = function(elmtIFrame)
{
	if (typeof elmtIFrame.tagName == doufu.System.Constants.TYPE_UNDEFINED ||
		elmtIFrame.tagName.toLowerCase() != "iframe")
	{
		throw doufu.System.Exception("elmtIFrame was not a iframe reference.");
	}
	
	return new doufu.Browser.WindowBase(elmtIFrame.contentWindow);
		
}