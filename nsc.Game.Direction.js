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
		
		_x = iDirectionValue & 0x30 >> 4;
		_y = iDirectionValue & 0x0C >> 2;
		_z = iDirectionValue & 0x03;
	}

	var _x;
	this.NewProperty("X");
	this.X.Get = function()
	{
		return _x;
	}
	
	var _y;
	this.NewProperty("Y");
	this.Y.Get = function()
	{
		return _y;
	}
	
	var _z;
	this.NewProperty("Z");
	this.Z.Get = function()
	{
		return _z;
	}
	
	this.toString = function()
	{
		return ((_x & 0x1)? (_x & 0x2?"Right":"Left"):"") + 
				((_y & 0x1)? (_y & 0x2?"Down":"Up"):"") +
				((_z & 0x1)? (_z & 0x2?"FlyUp":"FlyDown"):"");
	}
	
	this.Init();
}