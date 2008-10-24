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
	
	this.IsKeyDown = false;
	
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
		if (sKey.length != 1 || !re.test(sKey))
		{
			throw doufu.System.Exception("Key: " + sKey + "was not supported.");
			return false;
		}
		
		var g = new doufu.Browser.Element(doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer?document.body:window);
		
		// attach global events
		g.OnKeyUp.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			if (args.keyCode == sKey.toUpperCase()[0].charCodeAt())
			{
				var statusChanged = false;
				if (this.IsKeyDown)
				{
					statusChanged = true;
				}
				this.OnKeyUp.Invoke({StatusChanged:statusChanged});
				this.IsKeyDown = false;
			}
		},this));
		
		g.OnKeyDown.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			
			if (args.keyCode == sKey.toUpperCase()[0].charCodeAt())
			{
				var statusChanged = false;
				if (!this.IsKeyDown)
				{
					statusChanged = true;
				}
				this.OnKeyDown.Invoke({StatusChanged:statusChanged});
				this.IsKeyDown = true;
			}
			
		},this));
		
		
	}
	
	this.Ctor();
}