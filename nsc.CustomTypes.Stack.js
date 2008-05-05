nsc.CustomTypes.Stack = function()
{
	nsc.OOP.Class(this);

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
		var tmp = new nsc.CustomTypes.StackElement();
		tmp.RefObject = obj;
		tmp.LinkedStackElement = _top;
		_length++;
		return _top = tmp;
	}
	
	this.Pop = function(obj)
	{
		var tmp = _top;
		_top = _top.LinkedStackElement;
		_length--;
		return tmp;
	}
	

}

///##########################
/// Javascript Class
/// Name: nsc.CustomTypes.StackElement
/// Description: 
/// 	An element which used for stacking
///
/// Attribute:
/// 	RefObject: The actual content or data in the stack
/// 	LinkedStackElement: The stack element which on the bottom of current element
///
///##########################
nsc.CustomTypes.StackElement = function()
{
	nsc.OOP.Class(this);
	
	this.RefObject = null;
	this.LinkedStackElement = null;
	
}