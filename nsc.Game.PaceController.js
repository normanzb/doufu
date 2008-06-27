nsc.Game.PaceController = new function()
{
	nsc.OOP.Class(this);

	var i ;

	this.Inherit(nsc.DesignPattern.Attachable, [nsc.Game.BaseObject]);
	
	this.Cycle = new nsc.Cycling.Cycle(this.WorkerCallback);

	this.WorkerCallback = new nsc.Event.CallBack(function(oMsg)
	{
		var i ;
		for(i = 0; i < this.InnerCollection().Length(); i++)
		{
			this.InnerCollection().Items(i).Worker(oMsg);
		}
	}, this.InnerCollection().Items(i));
	
}