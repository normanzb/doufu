/*
	Class: doufu.CustomTypes.Collection
	
	A strong typed array
	
	Constructor:
		baseClass - Specify a base class, all elements in this collection should inherited from the base class
*/
doufu.CustomTypes.Collection = function(baseClass)
{
	doufu.OOP.Class(this);
	
	/*
		Property: InnerArray
		
		<doufu.Property>
		Get or set the inner array which used by collection.
	*/
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
	
	/*
		Property: Length
		
		<doufu.Property>
		Get the lenght of current collection.
	*/
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
	
	/*
		Function: Add
		
		Add a object of specified type to the collection.
		
		Parameters:
			obj - An object to be added.
	*/
	this.Add = function(obj)
	{
		if (typeof obj.InstanceOf == doufu.System.Constants.TYPE_UNDEFINED  || !obj.InstanceOf(baseClass))
		{
			throw doufu.System.Exception("doufu.CustomTypes.Collection::Add(): Specified object type is not allowed.");
		}
			
		_innerArray.push(obj);
		return this.Length();
	}
	
	/*
		Function: AddArray
		
		Add a set of objects of specified type to the collection.
		
		Parameters:
			obj - An array of object of specified type .
	*/
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
	
	/*
		Function: Remove
		
		Remove a object from collection
		
		Parameters:
			obj - An object to be removed.
	*/
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
	
	/*
		Function: Clear
		
		Clear the elements in the collection.
	*/
	this.Clear = function()
	{
		this.InnerArray().length = 0;
	}
	
	/*
		Function: Items
		
		Get the element in the collection with speicifed index.
	*/
	this.Items = function(index)
	{
		return _innerArray[index];
	}
	
	/*
		Function: Contain
		
		Check if specified obj is in this collection.
	*/
	this.Contain = function(obj)
	{
		for( var i = 0; i < this.Length(); i++)
		{
			if (obj === this.Items(i))
			{
				return true;
			}
		}
		
		return false;
	}
	
}
