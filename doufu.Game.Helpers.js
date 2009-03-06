/*
	Namespace: doufu.Game.Helpers
	
	Containing all game related helpers and collision test helpers.
*/
doufu.Game.Helpers = {};

/*
	Function: doufu.Game.Helpers.IsCollided
	
	Return true if two drawable object are collided. otherwise, return false.
	
	Parameters:
		obj1 - a Drawable object which to be tested.
		obj2 - a Drawable object which to be tested.
		oDirection -  [Optional] Only required when detecting polygon collision, if direction is specified, will speed up caculation.
*/
doufu.Game.Helpers.IsCollided = function(obj1, obj2, oDirection)
{
	if (doufu.System.APIs.NumberOfType(doufu.Display.Drawing.Rectangle, obj1, obj2) == 2)
	{
		return doufu.Game.Helpers.IsRectangleCollided(obj1, obj2);
	}
	else if (doufu.System.APIs.NumberOfType(doufu.Display.Drawing.Polygon, obj1, obj2) == 2)
	{
		return doufu.Game.Helpers.IsPolygonCollided(obj1, obj2, oDirection);
	}
	else if (doufu.System.APIs.NumberOfType(doufu.Display.Drawing.Rectangle, obj1, obj2) == 1 &&
		doufu.System.APIs.NumberOfType(doufu.Display.Drawing.Polygon, obj1, obj2) == 1)
	{
		if(obj1.InstanceOf(doufu.Display.Drawing.Rectangle))
		{
			doufu.Display.Drawing.ConvertRectangleToPolygon(obj1, doufu.Game.Helpers.IsCollided.__poly);
			return doufu.Game.Helpers.IsPolygonCollided(doufu.Game.Helpers.IsCollided.__poly, obj2);
		}
		else if(obj2.InstanceOf(doufu.Display.Drawing.Rectangle))
		{
			doufu.Display.Drawing.ConvertRectangleToPolygon(obj2, doufu.Game.Helpers.IsCollided.__poly);
			return doufu.Game.Helpers.IsPolygonCollided(doufu.Game.Helpers.IsCollided.__poly, obj1);
		}
	}
}

// don't want to instantiate at runtime.
doufu.Game.Helpers.IsCollided.__poly = new doufu.Display.Drawing.Polygon();
doufu.Game.Helpers.IsCollided.__rect = new doufu.Display.Drawing.Rectangle();

/*
	Function: doufu.Game.Helpers.IsRectangleCollided
	
	Return true if two rectangle object are collided. otherwise, return false.
	
	Parameters:
		obj1 - <doufu.Display.Drawing.Rectangle> a rectangle object which to be tested.
		obj2 - <doufu.Display.Drawing.Rectangle> a rectangle object which to be tested.
*/
doufu.Game.Helpers.IsRectangleCollided = function(oRectangle1, oRectangle2)
{
	
	if (!oRectangle1.InstanceOf(doufu.Display.Drawing.Rectangle))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): oRectangle1 is not a rectangle.");
	}
	
	if (!oRectangle2.InstanceOf(doufu.Display.Drawing.Rectangle))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): oRectangle2 is not a rectangle.");
	}
	
	if (oRectangle1.X > (oRectangle2.X + oRectangle2.Width) || (oRectangle1.X + oRectangle1.Width) < oRectangle2.X)
	{
		return false;
	}
	if (oRectangle1.Y > (oRectangle2.Y + oRectangle2.Height) || (oRectangle1.Y + oRectangle1.Height) < oRectangle2.Y)
	{
		return false;
	}
	return true;
}

/*
	Function: doufu.Game.Helpers.__intervalDistance
	
	Calculate the distance between [minA, maxA] and [minB, maxB]
	The distance will be negative if the intervals overlap
*/
doufu.Game.Helpers.__intervalDistance = function(minA, maxA, minB, maxB) 
{
	if (minA < minB) {
		return minB - maxA;
	} else {
		return minA - maxB;
	}
}

/*
	Function: doufu.Game.Helpers.ProjectPolygon
	
	Calculate the projection of a polygon on an axis and returns it as a [min, max] interval.
*/
doufu.Game.Helpers.ProjectPolygon = function(axis, polygon, min, max)
{
	// To project a point on an axis use the dot product
	var d = axis.DotProduct(polygon.Items(0));
	min.value = d;
	max.value = d;
	for (var i = 0; i < polygon.Length(); i++) {
		d = polygon.Items(i).DotProduct(axis);
		if (d < min.value) {
			min.value = d;
		} else {
			if (d > max.value) {
				max.value = d;
			}
		}
	}
}

/*
	Function: doufu.Game.Helpers.IsPolygonCollided
	
	Check if polygon A is going to collide with polygon B for the given velocity
	
	Parameters:
		polygonA - <doufu.Display.Drawing.Polygon> a polygon object which to be tested (The collidee).
		polygonB - <doufu.Display.Drawing.Polygon> a polygon object which to be tested.
		oDirection - [Optional] If specified, only do detection with the polygon in front of the collidee.
*/
doufu.Game.Helpers.IsPolygonCollided = function(polygonA, polygonB, oDirection) 
{
	// do velocity check
	// only do detection with the polygon in front of the collidee.
	doufu.Display.Drawing.ConvertPolygonToRectangle(polygonA, doufu.Game.Helpers.IsPolygonCollided.__rect1);
	doufu.Display.Drawing.ConvertPolygonToRectangle(polygonB, doufu.Game.Helpers.IsPolygonCollided.__rect2);
	
	if (oDirection != null)
	{
		if (!doufu.Game.Helpers.IsPolygonCollided.__rect1.IsDirectionOf(oDirection,  doufu.Game.Helpers.IsPolygonCollided.__rect2))
		{
			return false;
		}
	}
	if (!doufu.Game.Helpers.IsRectangleCollided(doufu.Game.Helpers.IsPolygonCollided.__rect1, doufu.Game.Helpers.IsPolygonCollided.__rect2))
	{
		return false;
	}
	
	
	if (polygonA.Edges == null || polygonA.Edges.Length() == 0)
	{
		polygonA.BuildEdges();
	}
	if (polygonB.Edges == null || polygonB.Edges.Length() == 0)
	{
		polygonB.BuildEdges();
	}
	
	var edgeCountA = polygonA.Edges.Length();
	var edgeCountB = polygonB.Edges.Length();

	var edge;
	
	// Loop through all the edges of both polygons
	for (var edgeIndex = 0; edgeIndex < edgeCountA + edgeCountB; edgeIndex++) 
	{
		
		if (edgeIndex < edgeCountA) {
			edge = polygonA.Edges.Items(edgeIndex);
		} else {
			edge = polygonB.Edges.Items(edgeIndex - edgeCountA);
		}

		// ===== 1. Find if the polygons are currently intersecting =====

		// Find the axis perpendicular to the current edge
		var axis = doufu.Game.Helpers.IsPolygonCollided.__axis;
		axis.X = -edge.Y;
		axis.Y = edge.X;
		axis.Normalize();

		// Find the projection of the polygon on the current axis
		var minA = new Object();
		var minB = new Object();
		var maxA = new Object();
		var maxB = new Object();
		
		doufu.Game.Helpers.ProjectPolygon(axis, polygonA, minA, maxA);
		doufu.Game.Helpers.ProjectPolygon(axis, polygonB, minB, maxB);

		// Check if the polygon projections are currentlty intersecting
		if (doufu.Game.Helpers.__intervalDistance(minA.value, maxA.value, minB.value, maxB.value) > 0) 
		{
			return false;
		}
		
	}
	
	return true;
}

doufu.Game.Helpers.IsPolygonCollided.__axis = new doufu.Display.Drawing.Vector();
doufu.Game.Helpers.IsPolygonCollided.__rect1 = new doufu.Display.Drawing.Rectangle();
doufu.Game.Helpers.IsPolygonCollided.__rect2 = new doufu.Display.Drawing.Rectangle();