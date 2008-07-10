doufu.Browser.DOMBase = function(docRef)
{
	
	doufu.OOP.Class(this);
	
	var _docRef;
	if (typeof docRef == doufu.System.Constants.TYPE_UNDEFINED || docRef == null)
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
		if(doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
			doufu.Browser.BrowserDetect.Version < 6)
		{
			return doufu.Browser.DOM.CompatibleMode.BACK_COMPAT;
		}
		else if(doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Safari)
		{
			if (this.DocType().publicId == doufu.Browser.DOM.DocType.DTDXHTML1Strict)
			{
				return doufu.Browser.DOM.CompatibleMode.CSS1_COMPAT;
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

doufu.Browser.DOM = new doufu.Browser.DOMBase();

//
doufu.Browser.GetDOMFromIFrame = function(elmtIFrame)
{
	return doufu.Browser.GetWindowFromIFrame(elmtIFrame).DOM;
}

// Constants
doufu.Browser.DOM.CompatibleMode.CSS1_COMPAT = "CSS1Compat";

doufu.Browser.DOM.CompatibleMode.BACK_COMPAT = "BackCompat";

doufu.Browser.DOM.DocType.DTDXHTML1Strict  = "-//W3C//DTD XHTML 1.0 Strict//EN";