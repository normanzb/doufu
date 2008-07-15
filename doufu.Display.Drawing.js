doufu.Display.Drawing = new Object();

doufu.Display.Drawing.Drawable = function()
{
	doufu.OOP.Class(this);
}

doufu.Display.Drawing.Point = function(x, y)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Drawable);
	
	this.X = x != null? x: 0;
	this.Y = y != null? y: 0;
}

doufu.Display.Drawing.Line = function(x1, y1, x2, y2)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Drawable);
	
	this.X1 = 0;
	this.Y1 = 0;
	this.X2 = 0;
	this.Y2 = 0;
	
	this.Ctor = function()
	{
		// Deep copying
		if (x1 != null && typeof x1.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED && x1.InstanceOf(doufu.Display.Drawing.Line))
		{
			this.X1 = x1.X1;
			this.Y1 = x1.Y1;
			this.X2 = x1.X2;
			this.Y2 = x1.Y2;
		}
		else
		{
			this.X1 = x1!=null?x1:0;
			this.Y1 = y1!=null?y1:0;
			this.X2 = x2!=null?x2:0;
			this.Y2 = y2!=null?y2:0;
		}
	}
	
	this.DeepCopy = function()
	{
		var ret = new doufu.Display.Drawing.Line();
		
		ret.X1 = this.X1;
		ret.Y1 = this.Y1;
		ret.X2 = this.X2;
		ret.Y2 = this.Y2;
		
		return ret;
	}
	
	this.Ctor();
}

doufu.Display.Drawing.Rectangle = function()
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Point);
	
	this.Width = 0;
	this.Height = 0;
}

doufu.Display.Drawing.Polygon = function(obj)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Drawable);
	
	this.Inherit(doufu.CustomTypes.Collection, [doufu.Display.Drawing.Point]);
	
	this.Ctor = function()
	{
		// Deep copying
		if (obj != null && obj.InstanceOf(doufu.Display.Drawing.Polygon))
		{
			for (var i = 0; i < obj.Length(); i ++)
			{
				this.Add(new doufu.Display.Drawing.Point(obj.Items(i)));
			}
		}
	}
	
	this.Ctor();
}

doufu.Display.Drawing.Cube = function(obj)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	this.Z = 0;
	this.Depth = 0;
	
	this.Ctor = function()
	{
		// Deep copying
		if (obj != null && obj.InstanceOf(doufu.Display.Drawing.Cube))
		{
			this.X = obj.X;
			this.Y = obj.Y;
			this.Z = obj.Z;
		}
	}
	
	this.Ctor();
}

