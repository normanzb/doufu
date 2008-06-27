nsc.DesignPattern.Attachable = function(type)
{
	nsc.OOP.Class(this);

	var _collection = new nsc.CustomTypes.Collection(type);
	
	this.NewProperty("InnerCollection");
	this.InnerCollection.Get = function()
	{
		return _collection;
	}
	
	this.Init = function()
	{
		if (typeof type == nsc.System.Constants.TYPE_UNDEFINED)
		{
			nsc.System.ThrowException("type parameter should not be null");
		}
	}
	
	this.Attach = function(obj)
	{
		_collection.Add(obj);
	}
	this.Detach = function()
	{
		_collection.Remove(obj);
	}
	
	this.Init();
}