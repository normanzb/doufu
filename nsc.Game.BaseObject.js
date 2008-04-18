nsc.Game.BaseObject = function(){
	
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Display.Drawing.Rectangle);
	
	this.Z = 0;

	var _linkedDisplayObject = new nsc.Display.BaseObject();
	this.NewProperty("LinkedDisplayObject");
	this.LinkedDisplayObject.Get = function()
	{
		return _linkedDisplayObject;
	}
	this.LinkedDisplayObject.Set = function(value)
	{
		_linkedDisplayObject = value;
	}
	
	
	
}