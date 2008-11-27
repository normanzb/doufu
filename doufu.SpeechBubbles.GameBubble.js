/*
	Class: doufu.SpeechBubbles.GameBubble
	
	A speech bubble which used in game screen
	
*/
// TODO: accept a sprite as container
doufu.SpeechBubbles.GameBubble = function(goContainer)
{
	doufu.OOP.Class(this);
	
	var goBorder = new doufu.Game.BaseObject();
	
	var goBorderElmt = goBorder.LinkedDisplayObject().HTMLElement();
	
	// temporarily
	this.Inherit(doufu.SpeechBubbles.BrowserBubble, [goBorderElmt]);
	
	var _base_Popup = this.OverrideMethod("Popup", function(x, y, msg)
	{
		goBorder.X = x;
		goBorder.Y = y;
		
		_base_Popup(0, 0, msg);
	});
	
	this.OverloadMethod("Popup", function(msg)
	{
		var x = goContainer.X + goContainer.Width/2;
		var y = goContainer.Y + goContainer.Height/5;
		
		this.Popup(x, y, msg);
	});
	
	this.Ctor = function()
	{
		//this.HTMLBorder().style.width = "100%";
		goBorder.Z = 2;
		goContainer.Children.Add(goBorder);
		
	}
	
	this.Ctor();
}