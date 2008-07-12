doufu.DesignPattern.Attachable = function(type)
{
	doufu.OOP.Class(this);

	var _collection = new doufu.CustomTypes.Collection(type);
	
	this.NewProperty("InnerCollection");
	this.InnerCollection.Get = function()
	{
		return _collection;
	}
	
	this.Ctor = function()
	{
		if (typeof type == doufu.System.Constants.TYPE_UNDEFINED)
		{
			doufu.System.ThrowException("type parameter should not be null");
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
	
	this.Ctor();
}