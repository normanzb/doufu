nsc.Browser.DOMBase = function(docRef)
{
	
	nsc.OOP.Class(this);
	
	var _docRef;
	if (typeof docRef == nsc.System.Constants.TYPE_UNDEFINED || docRef == null)
	{
		_docRef = document;
	}
	else
	{
		_docRef = docRef
	}
	this.NewProperty("DocRef");
	this.DocRef.Get = function()
	{
		return _docRef;
	}
	
	
	this.CreateElement = function(sElement)
	{
		return this.DocRef().createElement(sElement);
	}
	
	this.AppendChild = function(elmtAppend)
	{
		return this.DocRef().appendChild(elmtAppend);
	}

	this.CompatibleMode = function()
	{
		return this.DocRef().compatMode;
	}

	this.DesignMode = function()
	{
		return this.DocRef().designMode;
	}

	this.DocType = function()
	{
		return this.DocRef().doctype;
	}

	this.Charset = function()
	{
		return this.DocRef().defaultCharset;
	}

}

nsc.Browser.DOM = new nsc.Browser.DOMBase();

//
nsc.Browser.GetDOMFromIFrame = function(elmtIFrame)
{
	return nsc.Browser.GetWindowFromIFrame(elmtIFrame).DOM;
}

// Constants
nsc.Browser.DOM.CompatibleMode.CSS1_COMPAT = "CSS1Compat";

nsc.Browser.DOM.CompatibleMode.BACK_COMPAT = "BackCompat";