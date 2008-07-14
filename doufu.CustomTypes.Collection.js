// Strong typed array
doufu.CustomTypes.Collection = function(baseClass)
{
	doufu.OOP.Class(this);
	
	// Properties
	var _innerArray = new Array();
	this.NewProperty("InnerArray");
	this.InnerArray.Get = function()
	{
		return _innerArray;
	}
	this.InnerArray.Set = function(value)
	{
		_innerArray = value
	}
	
	this.NewProperty("Length");
	this.Length.Get = function()
	{
		return _innerArray.length;
	}
	this.Length.Set = function(value)
	{
		// readonly
		return;
	}
	// Properties end
	
	this.Add = function(obj)
	{
		doufu.System.Logger.Debug("doufu.CustomTypes.Collection::Add(): Adding object - " + obj);
		if (typeof obj.InstanceOf == doufu.System.Constants.TYPE_UNDEFINED  || !obj.InstanceOf(baseClass))
		{
			throw doufu.System.Exception("doufu.CustomTypes.Collection::Add(): Specified object type is not allowed.");
		}
			
		_innerArray.push(obj);
		return this.Length();
	}
	
	this.AddArray = function(obj)
	{
		if (typeof obj.length == doufu.System.Constants.TYPE_UNDEFINED || obj.length <= 0)
		{
			throw doufu.System.Exception("doufu.CustomTypes.Collection::AddArray(): Specified object is not an array or the array length is 0.");
		}
		
		for (var i = 0; i < obj.length; i ++)
		{
			if (typeof obj[i].InstanceOf == doufu.System.Constants.TYPE_UNDEFINED  || !obj[i].InstanceOf(baseClass))
			{
				throw doufu.System.Exception("doufu.CustomTypes.Collection::AddArray(): Specified object type is not allowed.");
			}
			_innerArray.push(obj[i]);
		}
		
		return this.Length();
	}
	
	this.Remove = function(obj)
	{
		for (var i = 0; i < this.Length; i++)
		{
			if (_innerArray[i] == obj)
			{
				break;
			}
		}
		_innerArray.splice(i,1);
		return this.Length();
	}
	
	this.Items = function(index)
	{
		return _innerArray[index];
	}
	
}
