/*
	Namespace: doufu.Display.Drawing
	
	Containing all drawing related sharp classes and helpers for convertion a sharp to another.
*/
doufu.Display.Drawing = {};

/*
	Class: doufu.Display.Drawing.Drawable
	
	Every sharps should inherit from this class
*/
doufu.Display.Drawing.Drawable = function()
{
	doufu.OOP.Class(this);
	
	/* 
		Property: DeepCopy
			<doufu.Property>
			Copy or get a new copy of current instance.
			If Property value is specified, function will copy the inputted Line object to current instance.
			Otherwise, function will genenrate a new instance of current instance.
	*/
	this.NewProperty("DeepCopy");
	this.DeepCopy.Get = function()
	{
		return new doufu.Display.Drawing.Drawable();
	}
	this.DeepCopy.Set = function(obj)
	{

	}
}

/*
	Class: doufu.Display.Drawing.Point
	
	A point class
	
	Inherit: 
	<doufu.Display.Drawing.Drawable>
*/
doufu.Display.Drawing.Point = function(x, y)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Drawable);
	
	/*
		Property: X
		
		The X coordinator
	*/
	this.X;
	
	/*
		Property: Y
		
		The X coordinator
	*/
	this.Y;
	
	this.Ctor = function()
	{
		if (x != null && typeof x.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED && x.InstanceOf(doufu.Display.Drawing.Point))
		{
			this.X = x.X;
			this.Y = x.Y;
		}
		else
		{
			this.X = x != null? x: 0;
			this.Y = y != null? y: 0;
		}
	}
	
	this.Ctor();

}

/*
	Class: doufu.Display.Drawing.Line
	
	A line class
	
	Inherit: 
	<doufu.Display.Drawing.Drawable>
	
	Constructor: 
		x1 - The x coordinator of first point or a instace of doufu.Display.Drawing.Line.
			If a instance of line was specified, constructor will do a deep copy.
		y1 - The y coordinator of first point.
		x2 - The x coordinator of second point.
		y2 - The y coordinator of second point.
*/
doufu.Display.Drawing.Line = function(x1, y1, x2, y2)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Drawable);
	
	/* 
		Property: X1
			Indicate the x coordinator of first point.
	*/
	this.X1 = 0;
	/* 
		Property: Y1
			Indicate the y coordinator of first point.
	*/
	this.Y1 = 0;
	/* 
		Property: X2
			Indicate the x coordinator of second point.
	*/
	this.X2 = 0;
	/* 
		Property: Y2
			Indicate the y coordinator of second point.
	*/
	this.Y2 = 0;
	
	this.Ctor = function()
	{
		// Deep copying
		if (x1 != null && typeof x1.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED)
		{
			this.DeepCopy(x1);
		}
		else
		{
			this.X1 = x1!=null?x1:0;
			this.Y1 = y1!=null?y1:0;
			this.X2 = x2!=null?x2:0;
			this.Y2 = y2!=null?y2:0;
		}
	}
	
	/* 
		Property: DeepCopy
			<doufu.Property>
			Copy or get a new copy of current instance.
			If Property value is specified, function will copy the inputted Line object to current instance.
			Otherwise, function will genenrate a new instance of current instance.
	*/
	this.NewProperty("DeepCopy");
	this.DeepCopy.Get = function()
	{
		return new doufu.Display.Drawing.Line(this);
	}
	this.DeepCopy.Set = function(oLine)
	{
		if (!oLine.InstanceOf(doufu.Display.Drawing.Line))
		{
			throw doufu.System.Exception("doufu.Display.Drawing.Line::DeepCopy.Set(): oLine must be an instance of doufu.Display.Drawing.Line or null");
		}
		this.X1 = oLine.X1;
		this.Y1 = oLine.Y1;
		this.X2 = oLine.X2;
		this.Y2 = oLine.Y2;
	}
	
	this.Ctor();
}

/*
	Class: doufu.Display.Drawing.Rectangle
	
	Rectangle class
	
	Inherit: 
	<doufu.Display.Drawing.Point>
	
	Constructor:
		obj - [Optional] If obj is specified and is a rectangle instance, contructor will do a deep copy of obj to current instance.
*/
doufu.Display.Drawing.Rectangle = function(obj)
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Point);
	
	/* 
		Property: Width
			Indicate the width of the rectangle.
	*/
	this.Width = 0;
	/* 
		Property: Height
			Indicate the height of the rectangle.
	*/
	this.Height = 0;
	
	/* 
		Property: DeepCopy
			<doufu.Property>
			Copy or get a new copy of current instance.
			If Property value is specified, function will copy the inputted Line object to current instance.
			Otherwise, function will genenrate a new instance of current instance.
	*/
	this.NewProperty("DeepCopy");
	this.DeepCopy.Get = function()
	{
		return new doufu.Display.Drawing.Polygon(this);
	}
	this.DeepCopy.Set = function(oRectangle)
	{
		if (!oRectangle.InstanceOf(doufu.Display.Drawing.Rectangle))
		{
			throw doufu.System.Exception("doufu.Display.Drawing.Rectangle::DeepCopy.Set(): oRectangle must be an instance of doufu.Display.Drawing.Rectangle or null");
		}
		
		this.X = oRectangle.X;
		this.Y = oRectangle.Y;
		this.Width = oRectangle.Width;
		this.Height = oRectangle.Height;
	}
	
	this.Ctor = function()
	{
		if (obj != null)
		{
			this.DeepCopy(obj);
		}
	}
	
	this.Ctor();
}

/*
	Class: doufu.Display.Drawing.Polygon
	
	Polygon class
	
	Inherit: 
	<doufu.Display.Drawing.Drawable>, <doufu.CustomTypes.Collection> (<doufu.Display.Drawing.Point>)
*/
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
			this.DeepCopy(obj);
		}
	}
	
	/* 
		Property: DeepCopy
			<doufu.Property>
			Copy or get a new copy of current instance.
			If Property value is specified, function will copy the inputted Line object to current instance.
			Otherwise, function will genenrate a new instance of current instance.
	*/
	this.NewProperty("DeepCopy");
	this.DeepCopy.Get = function()
	{
		return new doufu.Display.Drawing.Polygon(this);
	}
	this.DeepCopy.Set = function(oPolygon)
	{
		if (!oPolygon.InstanceOf(doufu.Display.Drawing.Polygon))
		{
			throw doufu.System.Exception("doufu.Display.Drawing.Polygon::DeepCopy.Set(): oPolygon must be an instance of doufu.Display.Drawing.Polygon or null");
		}
		
		this.Clear();
		
		for (var i = 0; i < oPolygon.Length(); i ++)
		{
			this.Add(doufu.System.APIs.Clone(oPolygon.Items(i), 0));
		}
	}
	
	this.Ctor();
}

/*
	Class: doufu.Display.Drawing.Cube
	
	Cube class, describing sharp and position of a 3d cube.
	
	Inherit: 
	<doufu.Display.Drawing.Rectangle>
*/
doufu.Display.Drawing.Cube = function(obj)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	this.Z = 0;
	this.Depth = 0;
	
	this.Ctor = function()
	{
		// Deep copying
		if (obj != null && typeof obj.InstanceOf != doufu.System.Constants.TYPE_UNDEFINED)
		{
			this.DeepCopy(obj);
		}
	}
	
	this.NewProperty("DeepCopy");
	this.DeepCopy.Get = function()
	{
		return new doufu.Display.Drawing.Cube(this);
	}
	this.DeepCopy.Set = function(oCube)
	{
		if (!oCube.InstanceOf(doufu.Display.Drawing.Cube))
		{
			throw doufu.System.Exception("doufu.Display.Drawing.Cube::DeepCopy.Set(): oCube must be an instance of doufu.Display.Drawing.Cube or null");
		}
		
		this.X = oCube.X;
		this.Y = oCube.Y;
		this.Z = oCube.Z;
	}
	
	this.Ctor();
}

/* 
	Section: Static Functions
	
	Static drawing related helpers.
*/

/*
	Function: doufu.Display.Drawing.ConvertPointsToRectangle
	
	Convert two points to a rectangle, the width and height of rectangle will be a positive number.
	
	Parameters:
	
		oPoint1 - Specify the first point.
		oPoint2 - Specify the second point.
		oRectangle - [Out, Optional] if a rectangle is specified, function will modify the rectangle and return it.
					 if not, function will create a new rectangle.
					 Note: Creating new object will consuming lots of cpu times
	
	Returns:
	
		A rectangle which has two points same as the inputted point.
*/
doufu.Display.Drawing.ConvertPointsToRectangle = function(oPoint1, oPoint2, oRectangle)
{
	if (!oPoint1.InstanceOf(doufu.Display.Drawing.Point))
	{
		throw doufu.System.Exception("doufu.Display.Drawing.ConvertPointsToRectangle(): oPoint1 is not a Point.");
	}
	
	if (!oPoint2.InstanceOf(doufu.Display.Drawing.Point))
	{
		throw doufu.System.Exception("doufu.Display.Drawing.ConvertPointsToRectangle(): oPoint2 is not a Point.");
	}
	
	// smallest x point and y point, biggest x point and y point.
	var sPointX, sPointY, bPointX, bPointY;
	var rectRet;
	
	if (oPoint1.X < oPoint2.X)
	{
		sPointX = oPoint1.X;
		bPointX = oPoint2.X;
	}
	else
	{
		sPointX = oPoint2.X;
		bPointX = oPoint1.X;
	}
	
	if (oPoint1.Y < oPoint2.Y)
	{
		sPointY = oPoint1.Y;
		bPointY = oPoint2.Y;
	}
	else
	{
		sPointY = oPoint2.Y;
		bPointY = oPoint1.Y;
	}
	
	if (!oRectangle)
	{
		rectRet = new doufu.Display.Drawing.Rectangle();
	}
	else
	{
		rectRet = oRectangle;
	}
	
	rectRet.X = sPointX;
	rectRet.Y = sPointY;
	rectRet.Width = bPointX - sPointX;
	rectRet.Height = bPointY - sPointY;
	
	return rectRet;
}