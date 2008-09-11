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
*/
doufu.Game.Helpers.IsCollided = function(obj1, obj2)
{
	if (!doufu.Game.Helpers.IsAllowedCollisionObject(obj1, obj2))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): class of obj1 or obj2 did not inherited from an allowed type.");
	}
	
	if (obj1.InstanceOf(doufu.Display.Drawing.Rectangle) && obj2.InstanceOf(doufu.Display.Drawing.Rectangle))
	{
		return doufu.Game.Helpers.IsRectangleCollided(obj1, obj2);
	}
	else if (obj1.InstanceOf(doufu.Display.Drawing.Polygon))
	{
		return doufu.Game.Helpers.IsPolygonCollided(obj1, obj2);
	}
}

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
	Function: doufu.Game.Helpers.IsRectangleCollided
	
	Return true if two polygon object are collided. otherwise, return false.
	
	Parameters:
		obj1 - <doufu.Display.Drawing.Polygon> a polygon object which to be tested.
		obj2 - <doufu.Display.Drawing.Polygon> a polygon object which to be tested.
*/
doufu.Game.Helpers.IsPolygonCollided = function(oPolygon1, oPolygon2)
{
	if (!oPolygon1.InstanceOf(doufu.Display.Drawing.Polygon))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): oPolygon1 is not a Polygon.");
	}
	
	if (!oPolygon2.InstanceOf(doufu.Display.Drawing.Polygon))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): oPolygon2 is not a Polygon.");
	}
	
	// Initializing static varaible for speeding up the caculation.
	if (typeof doufu.Game.Helpers.IsPolygonCollided.__rec1 == doufu.System.Constants.TYPE_UNDEFINED ||
		typeof doufu.Game.Helpers.IsPolygonCollided.__rec2 == doufu.System.Constants.TYPE_UNDEFINED )
	{
		doufu.Game.Helpers.IsPolygonCollided.__rec1 = new doufu.Display.Drawing.Rectangle();
		doufu.Game.Helpers.IsPolygonCollided.__rec2 = new doufu.Display.Drawing.Rectangle();
	}
	
	// Create reference
	var oRectangle1 = doufu.Game.Helpers.IsPolygonCollided.__rec1;
	var oRectangle2 = doufu.Game.Helpers.IsPolygonCollided.__rec2;
	// Speed up end
	
	// do a rectangle collision detection first to avoid heavily cpu usage.
	var bRecCollided = false;
	
	for (var i = 0; i < oPolygon1.Length(); i++)
	{
		
		var i1 = i - 1;
		var i2 = i;
		
		if (i1 < 0)
		{
			i1 = oPolygon1.Length() - 1;
		}
		
		//doufu.System.Logger.Debug("oPolygon1, i: " + i);
		//doufu.System.Logger.Debug("\tX: " + oPolygon1.Items(1).X);
		//doufu.System.Logger.Debug("\tY: " + oPolygon1.Items(1).Y);
		
		doufu.Display.Drawing.ConvertPointsToRectangle(oPolygon2.Items(i1), oPolygon2.Items(i2), oRectangle1);
		
		for (var j = 0; j < oPolygon2.Length(); j++)
		{
			
			var j1 = j - 1;
			var j2 = j;
			
			if (j1 < 0)
			{
				j1 = oPolygon2.Length() - 1;
			}
			
			doufu.Display.Drawing.ConvertPointsToRectangle(oPolygon1.Items(j1), oPolygon1.Items(j2), oRectangle2);
			
			//doufu.System.Logger.Debug("oRec1: ");
			//doufu.System.Logger.Debug("\tX: " + oRectangle1.X);
			//doufu.System.Logger.Debug("\tY: " + oRectangle1.Y);
			//doufu.System.Logger.Debug("\tWidth: " + oRectangle1.Width);
			//doufu.System.Logger.Debug("\tHeight: " + oRectangle1.Height);
			
			//doufu.System.Logger.Debug("oRec2: ");
			//doufu.System.Logger.Debug("\tX: " + oRectangle2.X);
			//doufu.System.Logger.Debug("\tY: " + oRectangle2.Y);
			//doufu.System.Logger.Debug("\tWidth: " + oRectangle2.Width);
			//doufu.System.Logger.Debug("\tHeight: " + oRectangle2.Height);
			
			if(doufu.Game.Helpers.IsRectangleCollided(oRectangle1, oRectangle2))
			{
				bRecCollided = true;
				return bRecCollided;
			}
		}
	}

	return bRecCollided;
}

/*
	Function: doufu.Game.Helpers.IsAllowedCollisionObject
	
	Return true if two drawable object are allowed to do collision test. otherwise, return false.
	
	Parameters:
		obj1 - a Drawable object which to be tested.
		obj2 - a Drawable object which to be tested.
*/
doufu.Game.Helpers.IsAllowedCollisionObject = function(obj1, obj2)
{
	var baseClasses = [doufu.Display.Drawing.Rectangle, doufu.Display.Drawing.Polygon];
	for (var i = 0; i < baseClasses.length; i++)
	{
		// the two object base class must identical
		if (obj1.InstanceOf(baseClasses[i]) && obj2.InstanceOf(baseClasses[i]))
		{
			return true;
		}
	}
	
	return false;
}