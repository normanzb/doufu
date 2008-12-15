/*
	Class: doufu.SpeechBubbles.BaseBubble
*/

doufu.SpeechBubbles.BaseBubble = function()
{
	doufu.OOP.Class(this);
	
	// TODO: really need this?
	this.Inherit(doufu.Display.Drawing.Rectangle);
	
	/*
		Property: Style
		
		Specify which css will be applied to the bubble.
	*/
	this.Style = "default";
	
	/*
		Property: StickyTime
		
		if the text display in bubble is less than or equal BaseTextLength, then use StickyTime as the time sticked on the screen.
	*/
	this.StickyTime = 7 * 1000;
	
	/*
		Property: StickyFactor
		
		if the text display in bubble is more than BaseTextLength, then the actauly sticky time will be StickyFactor * TextLength / 5.
	*/
	this.StickyFactor = 200;
	
	/*
		Property: BaseTextLength
		
		If the text display in buble is more than this value, then the sticky time will increase depend on the StickyFactor property.
	*/
	this.BaseTextLength = 50; 
	
	/*
		Property: MaxWidth
		
		Specified the max width of the bubble, if exceed the max width then we will cut the text.
	*/
	this.MaxWidth = 110;
	
	/*
		Property: MinWidth
	*/
	this.MinWidth = 55;
	
	/*
		Property: Text
		
		<doufu.Property>
		The text display in bubble
	*/
	this.NewProperty("Text");
	
	/*
		Property: Width
	*/
	this.NewProperty("Width");
	
	/*
		Property: Height
	*/
	this.NewProperty("Height");
	
	/*
		Function: GetClassName
		
		Get the class name by specified a subfix
	*/
	this.GetClassName = function(subfix)
	{
		var mainPrefix = "doufu_SpeechBubbles_";
		return mainPrefix + this.Style + "_" + subfix;
	}
	
	/*
		Function: Popup
		
		Popup a speech bubble at specified location.
	*/
	this.Popup = function(x, y, msg, style)
	{
		
	}
	
	/*
		Function: Show
		
		display the bubble on the screen.
	*/
	this.Show = function()
	{
		
	}
	
	/*
		Function: Hide
		
		Hide the bubble from screen.
	*/
	this.Hide = function()
	{
	}
	

}