doufu.Browser.Element = function(element)
{
	
	doufu.OOP.Class(this);
	
	var _native;
	
	this.NewProperty("Native");
	this.Native.Get = function()
	{
		return _native;
	}
	
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
	
	this.$a = this.AppendChild
	
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
	}
	
	this.Ctor();
}