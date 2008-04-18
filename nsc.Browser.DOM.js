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
		if(nsc.Browser.BrowserDetect.Browser == nsc.Browser.BrowserDetect.BrowserEnum.Explorer &&
			nsc.Browser.BrowserDetect.Version < 6)
		{
			return nsc.Browser.DOM.CompatibleMode.BACK_COMPAT;
		}
		else if(nsc.Browser.BrowserDetect.Browser == nsc.Browser.BrowserDetect.BrowserEnum.Safari)
		{
			if (this.DocType().publicId == nsc.Browser.DOM.DocType.DTDXHTML1Strict)
			{
				return nsc.Browser.DOM.CompatibleMode.CSS1_COMPAT;
			}
		}
		else
		{
			return this.DocRef().compatMode;
		}
	}

	this.DesignMode = function()
	{
		return this.DocRef().designMode;
	}

	this.DocType = function()
	{
		// Attributes:
		//  	name
		// 		publicId
		// 		systemId
		// 		notations
		//  	entities
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

nsc.Browser.DOM.DocType.DTDXHTML1Strict  = "-//W3C//DTD XHTML 1.0 Strict//EN";