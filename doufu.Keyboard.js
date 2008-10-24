/*
	Namespace: doufu.Keyboard
*/
doufu.Keyboard = {};

/*
	Class: doufu.Keyboard.Key
	
	Key observer class
	
	Constructor:
		sKey - The key to be observed.
*/
doufu.Keyboard.Key = function(sKey)
{
	doufu.OOP.Class(this);
	
	/*
		Event: OnKeyDown
		
		Fired when the observed key was press down.
	*/
	this.OnKeyDown = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnKeyUp
		
		Fired when the observed key was released.
	*/
	this.OnKeyUp = new doufu.Event.EventHandler(this);
	
	this.Ctor = function()
	{
		var re = /[a-zA-Z]/;
		if (sKey.length != 1 || !re.match(sKey))
		{
			throw doufu.System.Exception("Key: " + sKey + "was not supported.");
			return false;
		}
		
		var g = new doufu.Browser.Element(document.body);
		
		// attach global events
		g.OnKeyUp.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			if (args.keyCode == sKey.toUpperCase()[0].charCodeAt())
			{
				this.OnKeyUp.Invoke();
			}
		},this));
		
		g.OnKeyDown.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			if (args.keyCode == sKey.toUpperCase()[0].charCodeAt())
			{
				this.OnKeyDown.Invoke();
			}
			
		},this));
		
		
	}
	
	this.Ctor();
}