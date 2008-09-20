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
	Class: doufu.Display.Drawing.Vector
	
	Vector class
	
	Inherit:
		<doufu.Display.Drawing.Point>
		
	See also:
		http://en.wikipedia.org/wiki/Vector_(spatial)
*/
doufu.Display.Drawing.Vector = function(x, y)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Point, [x, y]);
	
	/*
		Property: Magnitude
		
		Get the magnitude/length/norm of current point.
	*/
	this.NewProperty("Magnitude");
	this.Magnitude.Get = function()
	{
		return Math.sqrt(this.X * this.X + this.Y * this.Y);
	}
	
	/*
		Function: Normalize
		
		Normalize current point.
	*/
	this.Normalize = function()
	{
		var magnitude = this.Magnitude();
		this.X = this.X / magnitude;
		this.Y = this.Y / magnitude;
	}
	
	/*
		Function: GetNormalized
		
		Get a normalized new point.
	*/
	this.GetNormalized = function() 
	{
		var magnitude = this.Magnitude();

		return new doufu.Display.Drawing.Vector(this.X / magnitude, this.Y / magnitude);
	}
	
	/*
		Function: DotProduct
		
		Return dot product of current vector and specified vector.
		
		Parameters:
			vector - Specified the second vector
	*/
	this.DotProduct = function(vector) 
	{
		return this.X * vector.X + this.Y * vector.Y;
	}
	
	/*
		Function: DistanceTo
		
		Caculate the distance from current vector to specified vector
		
		Parameters:
			vector - Specified the destinate vector.
	*/
	this.DistanceTo = function(vector) {
		return Math.sqrt(Math.pow(vector.X - this.X, 2) + Math.pow(vector.Y - this.Y, 2));
	}
}

/*
	Function: Subtract
	
	Do a subtraction of two vector and return the result vector.
	
	Parameters: 
		vector1 - The minuend
		vector2 - The subtrahend
		outVector - [Out, Optional] The vector to output. If not specified, will create a new one.
*/
doufu.Display.Drawing.Vector.Subtract = function(vector1, vector2, outVector)
{
	var retVector;
	
	if (outVector == null)
	{
		retVector = new doufu.Display.Drawing.Vector();
	}
	else
	{
		retVector = outVector;
	}
	
	retVector.X = vector1.X - vector2.X;
	retVector.Y = vector1.Y - vector2.Y;
	
	return retVector;
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
	
	this.Inherit(doufu.CustomTypes.Collection, [doufu.Display.Drawing.Vector]);
	
	var edgeBuffer = [];
	// Create edge buffer
	for(var i = 0; i < 255; i++)
	{
		edgeBuffer.push(new doufu.Display.Drawing.Vector());
	}
	
	/* 
		Property: Edges
		
		<doufu.CustomTypes.Collection>
		Get a set of points represent the hull of current polygon.
	*/
	this.Edges = new doufu.CustomTypes.Collection(doufu.Display.Drawing.Vector);
	
	/*
		Property: Center
		
		<doufu.Property>
		Get the center vector.
	*/
	this.NewProperty("Center");
	this.Center.Get = function()
	{
		var totalX = 0;
		var totalY = 0;
		for (var i = 0; i < this.Length(); i++)
		{
			totalX += this.Items(i).X;
			totalY += this.Items(i).Y;
		}

		return new doufu.Display.Drawing.Vector(totalX / this.Length(), totalY / this.Length());
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
	
	/*
		Function: BuildEdges
		
		Build the edges of current polygon.
	*/
	this.BuildEdges = function()
	{
		var p1,p2;
		
		this.Edges.Clear();
		
		for (var i = 0; i < this.Length(); i++) {
			p1 = this.Items(i);
			if (i + 1 >= this.Length()) {
				p2 = this.Items(0);
			} else {
				p2 = this.Items(i + 1);
			}
			if (i >= edgeBuffer.length)
			{
				for (var j = edgeBuffer.length; j <= i; j++)
				{
					edgeBuffer.push(new doufu.Display.Drawing.Vector());
				}
			}
			doufu.Display.Drawing.Vector.Subtract(p2,p1, edgeBuffer[i]);
			this.Edges.Add(edgeBuffer[i]);
		}
	}
	
	this.OverloadMethod("Offset", function(v)
	{
		this.Offset(v.X, v.Y);
	});
	
	this.OverloadMethod("Offset", function(x, y) 
	{
		for (var i = 0; i < this.Length(); i++) {
			var p = this.Items(i);
			this.InnerArray()[i] = new doufu.Display.Drawing.Vector(p.X + x, p.Y + y);
		}
	});
	
	var __base_Clear = this.OverrideMethod("Clear", function()
	{
		
		this.Edges.Clear();
		
		__base_Clear.call(this);
	});
	
	this.Ctor = function()
	{
		// Deep copying
		if (obj != null && obj.InstanceOf(doufu.Display.Drawing.Polygon))
		{
			this.DeepCopy(obj);
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
	
	Convert two points to a rectangle.
	The first point will be the upleft point of the rectangle and the second point will be the bottom right point.
	
	Parameters:
	
		oPoint1 - Specify the upleft point.
		oPoint2 - Specify the bottom right point.
		oRectangle - [Out, Optional] if a rectangle is specified, function will modify the rectangle and return it.
					 if not, function will create a new rectangle.
					 Note: Creating new object will consuming lots of cpu times
	
	Returns:
	
		A rectangle.
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

/*
	Function: doufu.Display.Drawing.ConvertRectangleToPolygon
	
	Convert a rectangle to a polygon.
	
	Parameters:
	
		oRectangle - Specify the rectangle to be converted.
		outPolygon - [Out, Optional] if a polygon is specified, function will modify the polygon and return it.
					 if not, function will create a new polygon.
					 Note: Creating new object will consuming lots of cpu times
	
	Returns:
		A new polygon which has 4 points from the rectangle.
*/
doufu.Display.Drawing.ConvertRectangleToPolygon = function(oRectangle, outPolygon)
{
	if (!oRectangle.InstanceOf(doufu.Display.Drawing.Rectangle))
	{
		throw doufu.System.Exception("doufu.Display.Drawing.ConvertRectangleToPolygon(): oRectangle is not a rectangle.");
	}
	var retPolygon;
	if (outPolygon == null)
	{
		retPolygon = new doufu.Display.Drawing.Polygon();
	}
	else
	{
		retPolygon = outPolygon;
	}
	
	retPolygon.Clear();
	retPolygon.Add(new doufu.Display.Drawing.Vector(oRectangle.X, oRectangle.Y));
	retPolygon.Add(new doufu.Display.Drawing.Vector(oRectangle.X + oRectangle.Width, oRectangle.Y));
	retPolygon.Add(new doufu.Display.Drawing.Vector(oRectangle.X + oRectangle.Width, oRectangle.Y + oRectangle.Height));
	retPolygon.Add(new doufu.Display.Drawing.Vector(oRectangle.X, oRectangle.Y + oRectangle.Height));
	
	return retPolygon;
}

/*
	Function: doufu.Display.Drawing.ConvertPolygonToRectangle
	
	Create a rectangle hull for a polygon.
	The smallest and biggest coordinates of rectangle will be the same as the corresponding coordinates of the polygon.
	
	Parameters:
	
		oPolygon - Specify the polygon to be converted.
		outRectangle - [Out, Optional] if a rectangle is specified, function will modify the rectangle and return it.
					 if not, function will create a new rectangle.
					 Note: Creating new object will consuming lots of cpu times
	
	Returns:
		A new rectangle hull.
*/
doufu.Display.Drawing.ConvertPolygonToRectangle = function(oPolygon, outRectangle)
{
	if (!oPolygon.InstanceOf(doufu.Display.Drawing.Polygon))
	{
		throw doufu.System.Exception("doufu.Display.Drawing.ConvertRectangleToPolygon(): oPolygon is not a polygon.");
	}
	var retRectangle;
	if (outRectangle == null)
	{
		retRectangle = new doufu.Display.Drawing.Rectangle();
	}
	else
	{
		retRectangle = outRectangle;
	}
	
	var sX, sY, bX, bY;
	
	sX = oPolygon.Items(0).X;
	sY = oPolygon.Items(0).Y;
	bX = oPolygon.Items(0).X;
	bY = oPolygon.Items(0).Y;
	
	for(var i = 1; i < oPolygon.Length(); i++)
	{
		// get the lowest point.
		if (sX > oPolygon.Items(i).X)
		{
			sX = oPolygon.Items(i).X;
		}
		
		if (sY > oPolygon.Items(i).Y)
		{
			sY = oPolygon.Items(i).Y;
		}
		
		if (bX < oPolygon.Items(i).X)
		{
			bX = oPolygon.Items(i).X;
		}
		
		if (bY < oPolygon.Items(i).Y)
		{
			bY = oPolygon.Items(i).Y;
		}
	}
	
	retRectangle.X = sX;
	retRectangle.Y = sY;
	retRectangle.Width = bX - sX;
	retRectangle.Height = bY - sY;
	
	return retRectangle;
}