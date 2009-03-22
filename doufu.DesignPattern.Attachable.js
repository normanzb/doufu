doufu.DesignPattern.Attachable = function(type)
{
	doufu.OOP.Class(this);

	var _collection = new doufu.CustomTypes.Collection(type);
	
	this.NewProperty("InnerCollection");
	this.InnerCollection.Get = function()
	{
		return _collection;
	}
	
	/*
		Event: OnAttach
		Parameter: obj - obj which being attached.
	*/
	this.OnAttach = new doufu.Event.EventHandler(this);
	
	this.Ctor = function()
	{
		if (typeof type == doufu.System.Constants.TYPE_UNDEFINED)
		{
			doufu.System.ThrowException("type parameter should not be null");
		}
	}
	
	/*
		Function: Attach
	*/
	this.Attach = function(obj)
	{
		this.OnAttach.Invoke(obj);
		_collection.Add(obj);
	}
	this.Detach = function(obj)
	{
		_collection.Remove(obj);
	}
	
	this.Ctor();
}