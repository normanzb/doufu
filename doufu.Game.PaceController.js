doufu.Game.PaceController = new function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.DesignPattern.Attachable, [doufu.Game.BaseObject]);
	
	// The shared cycle which will be used by all game objects.
	this.Cycle;
	
	this.WorkerCallback = new doufu.Event.CallBack(function(oMsg)
	{
		var i;
		for(i = 0; i < this.InnerCollection().Length(); i++)
		{
			this.InnerCollection().Items(i).Pacer.call(this.InnerCollection().Items(i), oMsg);
		}
	}, this);
	
	this.Init = function()
	{
		this.Cycle = new doufu.Cycling.Cycle(this.WorkerCallback);
		this.Cycle.Start();
		
	}
	
	this.Init();
}