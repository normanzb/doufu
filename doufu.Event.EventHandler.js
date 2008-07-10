doufu.Event.EventHandler = function(oContext)
{
	doufu.OOP.Class(this);
	
	var oSender = oContext;
	var pCallBacks = new doufu.CustomTypes.Collection(doufu.Event.CallBack);
	
	this.Invoke = function(oEvent, oSenderOverride)
	{
		var tempSender;
		if (oSenderOverride != null)
		{
			tempSender = oSenderOverride;
		}
		else
		{
			tempSender = oSender;
		}
		for (var i = 0; i < pCallBacks.Length; i++)
		{
			pCallBacks.InnerArray()[i].Reference.call(pCallBacks.InnerArray()[i].Context, tempSender, oEvent);
		}
	}
	this.Attach = function(pCallback)
	{
		if (!pCallback.InstanceOf(doufu.Event.CallBack))
		{
			throw doufu.System.Exception("pCallback was not derived from doufu.Event.CallBack");
		}
		doufu.System.Logger.Debug("doufu.Event.EventHandler: Add call back " + pCallback);
		pCallBacks.Add(pCallback);
	}
	this.Detach = function(pCallback)
	{
		pCallBacks.Remove(pCallback);
	}
}