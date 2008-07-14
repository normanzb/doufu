doufu.Game.Helpers = new Object();

doufu.Game.Helpers.IsCollided = function(obj1, obj2)
{
	if (!doufu.Game.Helpers.IsAllowedCollisionObject(obj1, obj2))
	{
		throw doufu.System.Exception("doufu.Game.Helpers.IsCollided(): class of obj1 or obj2 did not inherited from an allowed type.");
	}
	
	if (obj1.InstanceOf(doufu.Display.Drawing.Rectangle))
	{
		return doufu.Game.Helpers.IsRectangleCollided(obj1, obj2);
	}
	else if (obj1.InstanceOf(doufu.Display.Drawing.Polygon))
	{
		return doufu.Game.Helpers.IsPolygonCollided(obj1, obj2);
	}
}

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

	return false;
}

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