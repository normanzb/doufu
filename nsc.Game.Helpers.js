nsc.Game.Helpers = new Object();

nsc.Game.Helpers.IsCollided = function(oRectangle1, oRectangle2)
{
	
	if (!oRectangle1.InstanceOf(nsc.Display.Drawing.Rectangle))
	{
		throw nsc.System.Exception("oRectangle1 is not a rectangle.");
	}
	
	if (!oRectangle2.InstanceOf(nsc.Display.Drawing.Rectangle))
	{
		throw nsc.System.Exception("oRectangle2 is not a rectangle.");
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