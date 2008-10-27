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

doufu.Game.Direction = function(iDirectionValue)
{
	doufu.OOP.Class(this);
	
	this.Ctor = function()
	{
		if (typeof iDirectionValue == doufu.System.Constants.TYPE_UNDEFINED)
		{
			iDirectionValue = 0;
		}
		
		if (iDirectionValue < 0 || iDirectionValue > 0x3F)
		{
			throw doufu.System.Exception("iDirection is not a valid format.");
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
	
	this.NewProperty("X");
	this.X.Get = function()
	{
		var sign = 1;
		
		if ((this.XAxis() >> 1) == 1)
		{
			sign = -1;
		}
		
		return sign * (this.XAxis() % 2);
	}
	this.X.Set = function(value)
	{
		if (value > 1 || value < -1)
		{
			throw doufu.System.Exception("Inputted value should between -1 and 1.");
		}
		
		_xAxis = value * value | ((value < 0?1:0) << 1);
		
	}
	
	var _yAxis;
	this.NewProperty("YAxis");
	this.YAxis.Get = function()
	{
		return _yAxis;
	}
	
	this.NewProperty("Y");
	this.Y.Get = function()
	{
		var sign = 1;
		
		if ((this.YAxis() >> 1) == 1)
		{
			sign = -1;
		}
		
		return sign * (this.YAxis() % 2);
	}
	this.Y.Set = function(value)
	{
		if (value > 1 || value < -1)
		{
			throw doufu.System.Exception("Inputted value should between -1 and 1.");
		}
		
		_yAxis = value * value | ((value < 0?1:0) << 1);
		
	}
	
	var _zAxis;
	this.NewProperty("ZAxis");
	this.ZAxis.Get = function()
	{
		return _zAxis;
	}
	
	this.NewProperty("Z");
	this.Z.Get = function()
	{
		var sign = 1;
		
		if ((this.ZAxis() >> 1) == 1)
		{
			sign = -1;
		}
		
		return sign * (this.ZAxis() % 2);
	}
	this.Z.Set = function(value)
	{
		if (value > 1 || value < -1)
		{
			throw doufu.System.Exception("Inputted value should between -1 and 1.");
		}
		
		_zAxis = value * value | ((value < 0?1:0) << 1);
		
	}
	
	this.toString = function()
	{
		return ((_xAxis & 0x1)? ((_xAxis & 0x2)?"Left":"Right"):"") + 
				((_yAxis & 0x1)? ((_yAxis & 0x2)?"Up":"Down"):"") +
				((_zAxis & 0x1)? ((_zAxis & 0x2)?"Ascend":"Descend"):"");
	}
	
	this.Ctor();
}