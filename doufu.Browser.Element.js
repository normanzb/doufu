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
	
	this.NewProperty("TagName");
	this.TagName.Get = function()
	{
		return this.Native().tagName;
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
		Event: OnFocus
		
		Fired when native element gets the focuse.
	*/
	var _onfocus;
	this.OnFocus = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnBlur
		
		Fired when onblur event of native element was fired.
		(Any loss focus)
	*/
	var _onblur;
	this.OnBlur = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnLoad
		
		Fire when onload event of native lement was fired.
	*/
	var _onload;
	this.OnLoad = new doufu.Event.EventHandler(this);
	
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
	
	this.RemoveChild = function(elmtRemove)
	{
		var elmtActual = elmtRemove;
		if (typeof elmtRemove.InstanceOf != $Undefined && elmtRemove.InstanceOf(doufu.Browser.Element))
		{
			elmtActual = elmtRemove.Native();
		}
		return _native.removeChild(elmtActual);
	}
	
	/*
		Function: SetAttribute
		
		Set the attribute of current element
		
		Parameters:
			sName - Attribute name
			sValue - Atrribute value
	*/
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
	
	
	
	/*
		Function: HasChild
		
		Return true if current element contained specified element.
	*/
	this.HasChild = function(oElement)
	{
		var elmtSet;
		var elNative;
		if (typeof oElement.InstanceOf != null)
		{
			elmtSet = this.Native().getElementsByTagName(oElement.TagName());
			elNative = oElement.Native();
		}
		{
			elmtSet = this.Native().getElementsByTagName(oElement.tagName);
			elNative = oElement;
		}
		
		for(i = 0; i < elmtSet.length; i ++)
		{
			if (elmtSet[i] == elNative)
			{
				return true;
			}
		}
		
		return false;
	}
	
	/*
		Function:
	*/
	var _noWrap = false;
	this.NewProperty("NoWrap");
	this.NoWrap.Get = function()
	{
		return _noWrap;
	}
	this.NoWrap.Set = function(value)
	{
		_noWrap = value;
		if (value == true)
		{
			this.Native().style.whiteSpace = "nowrap";
		}
		else
		{
			this.Native().style.whiteSpace = "normal";
		}
	}
	
	this.Dispose = function()
	{
		// detach events
		doufu.Browser.Helpers.DetachEvent(_native, "keydown", _onkeydown);
		doufu.Browser.Helpers.DetachEvent(_native, "keyup", _onkeyup);
		doufu.Browser.Helpers.DetachEvent(_native, "load", _onload);
		
		if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
			(_native == window || _native == document || _native == document.body))
		{
			doufu.Browser.Helpers.DetachEvent(_native, "focusout", _onblur);
		}
		else
		{
			doufu.Browser.Helpers.DetachEvent(_native, "blur", _onblur);
		}
		
		doufu.Browser.Helpers.DetachEvent(_native, "focus", _onfocus);
		
		// TODO: clear buffer
		//doufu.Browser.Element._elementBuffer.pop[_native] = null
		
		_native = null;
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
		
		// See if element is in buffer
		var bufferElmt = doufu.Browser.Element._elementBuffer.GetBufferElement(_native);
		if (bufferElmt != null)
		{
			// return and use buffered one directly
			return bufferElmt;
		}
		else
		{
			
			// attach native event listener
			_onkeydown = nativeEventArgProcessor(this.OnKeyDown.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "keydown", _onkeydown);
			
			_onkeyup = nativeEventArgProcessor(this.OnKeyUp.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "keyup", _onkeyup);
			
			_onload = nativeEventArgProcessor(this.OnLoad.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "load", _onload);
			
			// on blur
			if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
				(_native == window || _native == document || _native == document.body))
			{
				var self = this;
				_onblur = nativeEventArgProcessor(function(e)
				{
					if (typeof self.__activeElement == doufu.System.Constants.TYPE_UNDEFINED ||
						self.__activeElement != document.activeElement)
					{
						self.__activeElement = document.activeElement
					}
					else
					{
						self.OnBlur.Invoke(e);
					}
				});
				doufu.Browser.Helpers.AttachEvent(_native, "focusout", _onblur);
			}
			else
			{
				_onblur = nativeEventArgProcessor(this.OnBlur.Invoke);
				doufu.Browser.Helpers.AttachEvent(_native, "blur", _onblur);
			}
			
			// on focus
			_onfocus = nativeEventArgProcessor(this.OnFocus.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "focus", _onfocus);
			
			// add self into buffer
			doufu.Browser.Element._elementBuffer.push(this);
		}
	}
	
	return this.Ctor();
}

doufu.Browser.Element._elementBuffer = [];
doufu.Browser.Element._elementBuffer.GetBufferElement = function(_native)
{
	for(var i = 0; i < doufu.Browser.Element._elementBuffer.length; i++)
	{
		if (doufu.Browser.Element._elementBuffer[i].Native() == _native)
		{
			return doufu.Browser.Element._elementBuffer[i];
		}
	}
	
	return null;
}