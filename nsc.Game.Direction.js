// Direction define:
// 		(00 00 00)Binary
//		 x  y  z
//
// 00 00 stands for no direction in the direction
// y: 01 stands for move down
// y: 11 stands for move up
// x: 01 stands for move right.
// x: 11 stands for move left
// z: 01 stands for increase z coordinate (fly up)
// z: 11 stands for decrease z coordinate 

nsc.Game.Direction = function(iDirectionValue)
{
	nsc.OOP.Class(this);
	
	this.Init = function()
	{
		if (typeof iDirectionValue == nsc.System.Constants.TYPE_UNDEFINED)
		{
			throw nsc.System.Exception("iDirection should not be null.");
		}
		
		if (iDirectionValue < 0 || iDirectionValue > 0x3F)
		{
			throw nsc.System.Exception("iDirection is not a valid format.");
		}
		
		_xAxis = (iDirectionValue & 0x30) >> 4;
		_yAxis = (iDirectionValue & 0x0C) >> 2;
		_zAxis = iDirectionValue & 0x03;
	}
	
	// X Axis direction
	var _xAxis;
	this.NewProperty("XAxis");
	this.XAxis.Get = function()
	{
		return _xAxis;
	}
	
	var _yAxis;
	this.NewProperty("YAxis");
	this.YAxis.Get = function()
	{
		return _yAxis;
	}
	
	var _zAxis;
	this.NewProperty("ZAxis");
	this.ZAxis.Get = function()
	{
		return _zAxis;
	}
	
	this.toString = function()
	{
		return ((_xAxis & 0x1)? ((_xAxis & 0x2)?"Left":"Right"):"") + 
				((_yAxis & 0x1)? ((_yAxis & 0x2)?"Up":"Down"):"") +
				((_zAxis & 0x1)? ((_zAxis & 0x2)?"Ascend":"Descend"):"");
	}
	
	this.Init();
}