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
		
		// get the global element
		var g = new doufu.Browser.Element(
			doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer?document.body:window
			);
		
		var onKeyUpCallback = new doufu.Event.CallBack(function(sender, args)
		{
			if (args.keyCode == sKey.toUpperCase().charCodeAt())
			{
				var statusChanged = false;
				if (this.IsKeyDown)
				{
					statusChanged = true;
				}
				
				this.IsKeyDown = false;
				this.OnKeyUp.Invoke({StatusChanged:statusChanged});
				
			}
		},this);
		
		// attach global events
		
		// on key up, need to handle loss focus also.
		g.OnKeyUp.Attach(onKeyUpCallback);
		g.OnBlur.Attach(onKeyUpCallback);
		
		// on key down
		g.OnKeyDown.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			
			if (args.keyCode == sKey.toUpperCase().charCodeAt())
			{
				var statusChanged = false;
				if (!this.IsKeyDown)
				{
					statusChanged = true;
				}
				
				this.IsKeyDown = true;
				this.OnKeyDown.Invoke({StatusChanged:statusChanged});
				
			}
			
		},this));
		
		
	}
	
	this.Ctor();
}