doufu.CustomTypes.Stack = function()
{
	doufu.OOP.Class(this);

	var _top;
	this.NewProperty("Top");
	this.Top.Get = function()
	{
		return _top;
	}
	
	var _length = 0;
	this.NewProperty("Length");
	this.Length.Get = function()
	{
		return _length;
	}
	this.Length.Set = function(value)
	{
		_length = value;
	}

	this.Push = function(obj)
	{
		var tmp = new doufu.CustomTypes.StackElement();
		tmp.RefObject = obj;
		tmp.LinkedStackElement = _top;
		_length++;
		return _top = tmp;
	}
	
	this.Pop = function()
	{
		var tmp = _top;
		_top = _top.LinkedStackElement;
		_length--;
		return tmp.RefObject;
	}
	

}

///##########################
/// Javascript Class
/// Name: doufu.CustomTypes.StackElement
/// Description: 
/// 	An element which used for stacking
///
/// Attribute:
/// 	RefObject: The actual content or data in the stack
/// 	LinkedStackElement: The stack element which on the bottom of current element
///
///##########################
doufu.CustomTypes.StackElement = function()
{
	doufu.OOP.Class(this);
	
	this.RefObject = null;
	this.LinkedStackElement = null;
	
}