doufu.Browser.Element = function(element)
{
	
	doufu.OOP.Class(this);
	
	var thisElement = this;
	
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
		
		Fire when onload event of native element was fired.
	*/
	var _onload;
	this.OnLoad = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnClick
		
		Fire when onclick event of native element was fired.
	*/
	var _onclick;
	this.OnClick = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnChange
		
		Fire when onchange event of native element was fired.
	*/
	var _onchange;
	this.OnChange = new doufu.Event.EventHandler(this);
	
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
		Property: NoWrap
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
	
	/*
		Property: Opacity
	*/
	var _opacity = 100;
	this.NewProperty("Opacity");
	this.Opacity.Get = function()
	{
		return _opacity;
	}
	this.Opacity.Set = function(value)
	{
		if (value > 100)
		{
			value = 100;
		}
		else if (value < 0)
		{
			value = 0;
		}
		_opacity = value;
		this.Native().style.opacity = Math.floor(value/10) / 10;
		this.Native().style.filter="alpha(opacity=" + value + ")";
	}
	
	this.Effects = new function()
	{
		doufu.OOP.Class(this);
		
		var thisEffects = this;
		
		var fadingDirection = 0;
		/*
			Property: FadingDirection
			
			1 stands for fade in, -1 stands for fade out
		*/
		this.NewProperty("FadingDirection");
		this.FadingDirection.Get = function()
		{
			return fadingDirection;
		}
		
		
		/*
			Event: OnFadeIn
		*/
		this.OnFadeIn = new doufu.Event.EventHandler(this);
		
		/*
			Event: OnFadeOut
		*/
		this.OnFadeOut = new doufu.Event.EventHandler(this);
		
		var FadeLoop = function(value, diff)
		{
			if (diff < 0)
			{
				if (fadingDirection > 0)
				{
					return;
				}
				
				if (thisElement.Opacity() <= 0)
				{
					thisEffects.OnFadeOut.Invoke({});
					return;
				}
			}
			else if (diff > 0)
			{
				if (fadingDirection < 0)
				{
					return;
				}
				if (thisElement.Opacity() >= 100)
				{
					thisEffects.OnFadeIn.Invoke({});
					return;
				}
			}
			
			thisElement.Opacity(value);
			value += diff;
			
			setTimeout(doufu.OOP._callBacker(function()
			{
				FadeLoop(value, diff)
			}, this), 100);
		}
		
		this.FadeIn = function(factor)
		{
			if (factor == null || factor < 1)
			{
				factor = 1;
			}
			else
			{
				facotr = Math.floor(factor);
			}
			if (fadingDirection != 1)
			{
				fadingDirection = 1;
				FadeLoop(thisElement.Opacity(), 10 * factor);
			}
			
		}
		
		this.FadeOut = function(factor)
		{
			if (factor == null || factor < 1)
			{
				factor = 1;
			}
			else
			{
				facotr = Math.floor(factor);
			}
			
			if (fadingDirection != -1)
			{
				fadingDirection = -1;
				FadeLoop(thisElement.Opacity(), -10 * factor);
			}
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
		if (String.isString(element))
		{
			_native = doufu.Browser.DOM.QuickSelect(element);
		}
		else
		{
			_native = element;
		}
		
		if (_native == null)
		{
			throw doufu.System.Exception("doufu.Browser.Element::Ctor() - Specified element is null.");
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
			
			_onclick = nativeEventArgProcessor(this.OnClick.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "click", _onclick);
			
			_onchange = nativeEventArgProcessor(this.OnChange.Invoke);
			doufu.Browser.Helpers.AttachEvent(_native, "change", _onchange);
			
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