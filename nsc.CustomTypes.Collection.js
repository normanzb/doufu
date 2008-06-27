// Strong typed array
nsc.CustomTypes.Collection = function(baseClass)
{
	nsc.OOP.Class(this);
	
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
		nsc.System.Logger.Debug("nsc.CustomTypes.Collection: Add - " + obj);
		if (typeof obj.InstanceOf == nsc.System.Constants.TYPE_UNDEFINED  || !obj.InstanceOf(baseClass))
		{
			throw nsc.System.Exception("Specified object type is not allowed.");
		}
			
		_innerArray.push(obj);
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
