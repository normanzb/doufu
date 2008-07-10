doufu.Display.Drawing = new Object();

doufu.Display.Drawing.Point = function()
{
	doufu.OOP.Class(this);
	
	this.X = 0;
	this.Y = 0;
}

doufu.Display.Drawing.Rectangle = function()
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Point);
	
	this.Width = 0;
	this.Height = 0;
}

doufu.Display.Drawing.Cube = function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	this.Z = 0;
	this.Depth = 0;
}