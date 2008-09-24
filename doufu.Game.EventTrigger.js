/*
	Class: doufu.Game.EventTrigger
	
	Game event trigger class
*/
doufu.Game.EventTrigger = function()
{
	doufu.OOP.Class(this);
	
	var monitoredSprites = new doufu.CustomTypes.Collection(doufu.Game.Sprites.Sprite);
	var activated = true;
	
	/*
		Event: OnCheckCondition
		
		Will be triggered when this event trigger was triggered.
	*/
	this.OnCheckCondition = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnTrigger
		
		Will be triggered when this trigger condition is met.
	*/
	this.OnTrigger = new doufu.Event.EventHandler(this);
	
	/*
		Function: Trigger
		
		Trigger this event trigger.
	*/
	this.Trigger = function(sender, args)
	{
		if (!this.IsActivated())
		{
			if (this.AutoReactivate())
			{
				// check where
				if (this.Where() != null)
				{
					if (this.Where().Z != args.Cube.Z || !doufu.Game.Helpers.IsRectangleCollided(args.Cube, this.Where()))
					{
						this.Activate();
					}
					else
					{
						return;
					}
				}
				else
				{
					this.Activate();
				}
			}
			else
			{
				return;
			}
		}
		// check who
		if (this.Who().Contain(args.Who))
		{
			// at least one condition
			var atLeastOne = false;
			// check when
			if (this.When() != null)
			{
				atLeastOne = true;
				var time = (new Date()).getTime() - this.When().getTime() ;
				if (!(time > 0 && time < 500))
				{
					return;
				}
			}
			
			// check where
			if (this.Where() != null)
			{
				atLeastOne = true;
				if (this.Where().Z != args.Cube.Z || !doufu.Game.Helpers.IsRectangleCollided(args.Cube, this.Where()))
				{
					return;
				}
			}
			
			var lastResult = this.OnCheckCondition.Invoke();
			
			if (lastResult != null)
			{
				atLeastOne = true;
				if (lastResult == false)
				{
					return;
				}
			}
			
			if (atLeastOne== true)
			{
				this.OnTrigger.Invoke(args);
				
				this.Inactivate();
			}
		}
	}
	
	var triggerCallback = new doufu.Event.CallBack(this.Trigger, this); 
	
	/*
		Function: Monitor
		
		Who can trigger this event.
		Specify the sprite or map (to be done) which to be monitored, will attach this.Trigger to the sprite or map's OnTriggerEvent method.
		
		Parameters:
			obj - Specify sprite or map
	*/
	this.Monitor = function(obj)
	{
		if (obj.InstanceOf(doufu.Game.Sprites.Sprite))
		{
			obj.OnTriggerEvent.Attach(triggerCallback, this);
			monitoredSprites.Add(obj);
		}
		else if (obj.InstanceOf(doufu.Game.Map))
		{
			//TODO
		}
	}
	
	/*
		Function: Activate
		
		Activate this event trigger.
	*/
	this.Activate = function()
	{
		activated = true;
	}
	
	/*
		Function: Inactivate
		
		Inactivate this event trigger.
	*/
	this.Inactivate = function()
	{
		activated = false;
	}
	
	/*
		Property: Who
		
		<doufu.Property>
		Get or set who can trigger this event.
		
	*/
	this.NewProperty("Who");
	this.Who.Get = function()
	{
		return monitoredSprites;
	}
	this.Who.Set = function(value)
	{
		if (!monitoredSprites.Contain(value))
		{
			monitoredSprites.Add(value);
		}
	}
	
	/*
		Property: When
		
		<doufu.Property>
		Get or set when to trigger this event.
	*/
	var when;
	this.NewProperty("When");
	this.When.Get = function()
	{
		return when;
	}
	this.When.Set = function(value)
	{
		when = value;
	}
	
	/*
		Property: Where
		
		<doufu.Property>, <doufu.Display.Drawing.Rectangle>
		Get or set the place to trigger this event.
		
		Remarks:
			event trigger will do rectangle collision when this property was set, if the trigger collided with this rectangle, event will be fired.
	*/
	var where;
	this.NewProperty("Where");
	this.Where.Get = function()
	{
		return where;
	}
	this.Where.Set = function(value)
	{
		where = value;
	}
	
	/*
		Property: IsActivated
		
		Get a value indicate whether this trigger is activated.
	*/
	this.NewProperty("IsActivated");
	this.IsActivated.Get = function()
	{
		return activated;
	}
	
	/*
		Property: AutoReactivate
		
		Specify whether to reactivate event trigger after sprite leave collision area.
	*/
	var autoReactivate = true;
	this.NewProperty("AutoReactivate");
	this.AutoReactivate.Get = function()
	{
		return autoReactivate;
	}
	this.AutoReactivate.Set = function(value)
	{
		autoReactivate = value;
	}

}