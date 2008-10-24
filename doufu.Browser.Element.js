doufu.Browser.Element = function(element)
{
	
	doufu.OOP.Class(this);
	
	var _native;
	var nativeEventArgProcessor = function(pFunc)
	{
		return function(e)
		{
			if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
				typeof event != doufu.System.Constants.TYPE_UNDEFINED)
			{
				e = event;
			}
			
			pFunc(e);
		};
	}
	
	/*
		Property: Native
		
		Get the native dom element.
	*/
	this.NewProperty("Native");
	this.Native.Get = function()
	{
		return _native;
	}
	
	/*
		Event: OnKeyDown
		
		Fired when onkeydown event of native element was fired.
		(Any key was pressed)
	*/
	var _onkeydown;
	this.OnKeyDown = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnKeyUp
		
		Fired when onkeyup event of native element was fired.
		(Any key was reelase)
	*/
	var _onkeyup;
	this.OnKeyUp = new doufu.Event.EventHandler(this);
	
	/*
		Function: AppendChild
		
		Append a child node to current document
	*/
	this.AppendChild = function(elmtAppend)
	{
		var elmtActual = elmtAppend;
		if (typeof elmtAppend.InstanceOf != $Undefined && elmtAppend.InstanceOf(doufu.Browser.Element))
		{
			elmtActual = elmtAppend.Native();
		}
		return _native.appendChild(elmtActual);
	}
	
	this.SetAttribute = function(sName, sValue)
	{
		if (sName.toLowerCase() == "class")
		{
			return _native.className = sValue;
		}
		else
		{
			return _native.setAttribute(sName, sValue);
		}
	}
	
	this.$a = this.AppendChild;
	
	this.Dispose = function()
	{
		doufu.Browser.Helpers.DetachEvent(_native, "keydown", _onkeydown);
		doufu.Browser.Helpers.DetachEvent(_native, "keyup", _onkeyup);
	}
	
	this.Ctor = function()
	{
		if ((typeof element).toLowerCase() == "string")
		{
			_native = doufu.Browser.DOM.Select(element);
		}
		else
		{
			_native = element;
		}
		
		if (_native == null)
		{
			throw doufu.Exception("doufu.Browser.Element::Ctor() - Specified element is null.");
		}
		
		// attach native event listener
		_onkeydown = nativeEventArgProcessor(this.OnKeyDown.Invoke);
		doufu.Browser.Helpers.AttachEvent(_native, "keydown", _onkeydown);
		_onkeyup = nativeEventArgProcessor(this.OnKeyUp.Invoke);
		doufu.Browser.Helpers.AttachEvent(_native, "keyup", _onkeyup);
	}
	
	this.Ctor();
}